using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ErpPopravni.Context;
using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using ErpPopravni.Services;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ButikContext _context;
        private IOrderService _orderService;
        private readonly string _stripeSecretKey;

        public OrderController(ButikContext context, IOrderService orderService, IConfiguration configuration)
        {
            _context = context;
            _orderService = orderService;
            _stripeSecretKey = configuration["Stripe:SecretKey"];
        }

        [HttpGet("")]
        [Authorize(Roles = "Employee")]
        public IActionResult GetAll()
        {
            var allOrders = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ToList();

            foreach (var order in allOrders)
            {
                foreach (var orderItem in order.OrderItems)
                {
                    _context.Entry(orderItem).Reference(oi => oi.Product).Load();
                }
            }

            return StatusCode(StatusCodes.Status200OK, allOrders);
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public IActionResult GetOrdersByUser(int userId)
        {
            var user = _context.Users.Find(userId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            var orders = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .Where(o => o.User.UserID == userId)
                .ToList();

            foreach (var order in orders)
            {
                foreach (var orderItem in order.OrderItems)
                {
                    _context.Entry(orderItem).Reference(oi => oi.Product).Load();
                }
            }

            return StatusCode(StatusCodes.Status200OK, orders);
        }

        [HttpPost("")]
        [Authorize]
        public async Task<IActionResult> AddOrder([FromHeader] int userId, [FromBody] OrderDTO order)
        {
            if (order.OrderItems.Length == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            var user = _context.Users.Find(userId);
            var orderItems = new List<OrderItem>();

            foreach (var item in order.OrderItems)
            {
                var product = _context.Products.Find(item.ProductID);

                if (product == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }

                var orderItem = new OrderItem()
                {
                    Product = product,
                    Price = product.Price,
                    Amount = item.Amount
                };

                orderItems.Add(orderItem);
            }

            var newOrder = new Order()
            {
                Date = DateTime.Now,
                User = user,
                OrderItems = orderItems
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            var paymentIntentId = await CreatePaymentIntent(newOrder);
            if (string.IsNullOrEmpty(paymentIntentId))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške pri obradi plaćanja.");
            }

            return StatusCode(StatusCodes.Status201Created, new { Order = newOrder, PaymentIntentId = paymentIntentId });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(order).Collection(o => o.OrderItems).Load();
            _context.Entry(order).Reference(o => o.User).Load();

            foreach (var orderItem in order.OrderItems)
            {
                _context.Entry(orderItem).Reference(oi => oi.Product).Load();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status202Accepted, order);
        }

        private async Task<string> CreatePaymentIntent(Order order)
        {
            try
            {
                StripeConfiguration.ApiKey = _stripeSecretKey;

                var options = new PaymentIntentCreateOptions
                {
                    Amount = Convert.ToInt64(calculateOrderAmount(order) * 100),
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };


                var service = new PaymentIntentService();
                var paymentIntent = await service.CreateAsync(options);

                return paymentIntent.Id;
            }
            catch (StripeException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        private decimal calculateOrderAmount(Order order)
        {
            return order.OrderItems.Sum(oi => oi.Amount * oi.Price);
        }

    }
}