using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ErpPopravni.Context;
using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ButikContext _context;

        public ProductController(ButikContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var allProducts = _context.Products
                .Include(p => p.ProductCategory)
                .Include(p => p.PeopleCategories).ToList();

            return StatusCode(StatusCodes.Status200OK, allProducts);
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            var category = _context.ProductCategories.Find(categoryId);

            if (category == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            var products = _context.Products
                .Include(p => p.ProductCategory)
                .Include(p => p.PeopleCategories)
                .Where(p => p.ProductCategory.ProductCategoryID == categoryId)
                .ToList();

            return StatusCode(StatusCodes.Status200OK, products);
        }

        [HttpGet("{id}")]
        public IActionResult GetByID(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(product).Reference(p => p.ProductCategory).Load();
            _context.Entry(product).Collection(p => p.PeopleCategories).Load();

            return StatusCode(StatusCodes.Status200OK, product);
        }

        [HttpPost("")]
        [Authorize(Roles = "Employee")]
        public IActionResult AddProduct(ProductDTO product)
        {
            var productCategory = _context.ProductCategories.Find(product.ProductCategory);
            var peopleCategories = new List<PeopleCategory>();

            foreach (var categoryId in product.PeopleCategories)
            {
                peopleCategories.Add(_context.PeopleCategories.Find(categoryId));
            }


            if (productCategory == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            var newProduct = new Product()
            {
                Name = product.Name,
                Amount = product.Amount,
                Price = product.Price,
                ProductCategory = productCategory,
                PeopleCategories = peopleCategories,
                Image = product.Image
            };


            _context.Products.Add(newProduct);
            
            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status201Created, newProduct);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Employee")]
        public IActionResult UpdateProduct(int id, ProductDTO product)
        {
            var productFromDB = _context.Products.Find(id);

            if (productFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            var productCategory = _context.ProductCategories.Find(product.ProductCategory);
            var peopleCategories = new List<PeopleCategory>();

            foreach (var categoryId in product.PeopleCategories)
            {
                peopleCategories.Add(_context.PeopleCategories.Find(categoryId));
            }

            if (productCategory == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            _context.Entry(productFromDB).Collection(p => p.PeopleCategories).Load();

            //var pivotEntries = productFromDB.Categories;
            //productFromDB.Categories.Remove(pivotEntries);

            productFromDB.Name = product.Name;
            productFromDB.Amount = product.Amount;
            productFromDB.Price = product.Price;
            productFromDB.ProductCategory = productCategory;
            productFromDB.Image = product.Image;

            productFromDB.PeopleCategories.Clear();
            
            foreach(var category in peopleCategories)
            {
                productFromDB.PeopleCategories.Add(category);
            }

            _context.Products.Update(productFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, productFromDB);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Employee")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(product).Reference(p => p.ProductCategory).Load();
            _context.Entry(product).Collection(p => p.PeopleCategories).Load();

            _context.Products.Remove(product);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, product);
        }

        [HttpGet("{productId}/reviews")]
        public IActionResult GetAllReviewsByProduct(int productId)
        {
            var product = _context.Products.Find(productId);

            if (product == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(product).Collection(p => p.Reviews).Load();

            var reviews = product.Reviews;

            foreach (var review in reviews)
            {
                _context.Entry(review).Reference(r => r.User).Load();
            }

            return StatusCode(StatusCodes.Status200OK, reviews);
        }

        [HttpPost("{productId}/reviews")]
        public IActionResult CreateProductReview(int productId, [FromHeader] int userId, ReviewDTO review)
        {
            var product = _context.Products.Find(productId);
            var user = _context.Users.Find(userId);

            if (product == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            var newReview = new Review()
            {
                Product = product,
                User = user,
                Date = DateTime.Now,
                Comment = review.Comment,
                Rating = review.Rating
            };

            _context.Reviews.Add(newReview);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            _context.Entry(newReview).Reference(r => r.User).Load();

            return StatusCode(StatusCodes.Status201Created, newReview);
        }

        [HttpPut("{productId}/reviews/{reviewId}")]
        [Authorize]
        public IActionResult UpdateProductReview(int productId, int reviewId, ReviewDTO review)
        {
            var product = _context.Products.Find(productId);
            var reviewFromDB = _context.Reviews.Find(reviewId);

            if (product == null || reviewFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            reviewFromDB.Comment = review.Comment;
            reviewFromDB.Rating = review.Rating;
            reviewFromDB.Date = DateTime.Now;

            _context.Reviews.Update(reviewFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            _context.Entry(reviewFromDB).Reference(r => r.User).Load();

            return StatusCode(StatusCodes.Status202Accepted, reviewFromDB);
        }

        [HttpDelete("{productId}/reviews/{reviewId}")]
        [Authorize]
        public IActionResult DeleteProductReview(int productId, int reviewId)
        {
            var product = _context.Products.Find(productId);
            var reviewFromDB = _context.Reviews.Find(reviewId);

            if (product == null || reviewFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Entry(reviewFromDB).Reference(r => r.User).Load();

            _context.Reviews.Remove(reviewFromDB);
            
            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, reviewFromDB);
        }
    }
}
