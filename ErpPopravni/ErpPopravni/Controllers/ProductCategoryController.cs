using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ErpPopravni.Context;
using ErpPopravni.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly ButikContext _context;

        public ProductCategoryController(ButikContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var categories = _context.ProductCategories.ToList();
            return StatusCode(StatusCodes.Status200OK, categories);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductCategoryById(int id)
        {
            var category = _context.ProductCategories.Find(id);

            if (category == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            return StatusCode(StatusCodes.Status200OK, category);
        }

        [HttpPost("")]
        [Authorize(Roles = "Employee")]
        public ProductCategory AddProductCategory(ProductCategory productCategory)
        {
            _context.ProductCategories.Add(productCategory);
            _context.SaveChanges();

            return productCategory;
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Employee")]
        public ProductCategory UpdateProductCategory(ProductCategory productCategory)
        {
            _context.ProductCategories.Update(productCategory);
            _context.SaveChanges();

            return productCategory;
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Employee")]
        public ProductCategory DeleteProductCategory(int id)
        {
            ProductCategory categoryForDelete = _context.ProductCategories.Find(id);
            _context.ProductCategories.Remove(categoryForDelete);
            _context.SaveChanges();

            return categoryForDelete;
        }
    }
}
