using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Services
{
    public class OrderService : IOrderService
    {
        public List<OrderItem> getItems(OrderDTO[] items, int orderId)
        {
            throw new NotImplementedException();
        }

        public void getUserOrders (IQueryable<Order> orders)
        {

        }

        public Order makeOrder(int userID)
        {
            throw new NotImplementedException();
        }
        //public List<OrderItem> getItems(OrderDTO [] items, int orderId)
        //{
        //    List<OrderItem> orderItems = new List<OrderItem>();

        //    for (int i = 0; i < items.Length; i++)
        //    {
        //        for (int j = 0; j < items[i].products.Length; j++)
        //        {
        //            OrderItem item = new OrderItem()
        //            {
        //                OrderItemID = orderId,
        //                Pro = items[i].products[j].product,
        //                price = items[i].products[j].price,
        //                amount = items[i].products[j].amount
        //            };

        //            orderItems.Add(item);
        //        }
        //    }
        //    return orderItems;
        //}

        //public Order makeOrder( int userID)
        //{
        //    Order newOrder = new Order()
        //    {
        //        userID = userID,
        //        date = DateTime.Now
        //    };

        //    return newOrder;
        //}
    }
}
