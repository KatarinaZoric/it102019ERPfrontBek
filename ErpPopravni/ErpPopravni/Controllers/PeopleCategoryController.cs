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
    public class PeopleCategoryController : ControllerBase
    {
        private readonly ButikContext _context;

        public PeopleCategoryController(ButikContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var people = _context.PeopleCategories.ToList();
            return StatusCode(StatusCodes.Status200OK, people);
        }

        [HttpPost("/peopleCategory")]
        [Authorize(Roles = "Employee")]
        public PeopleCategory AddPeopleCategory(PeopleCategory people)
        {
            _context.PeopleCategories.Add(people);
            _context.SaveChanges();

            return people;
        }

        [HttpPut("/peopleCategory")]
        [Authorize(Roles = "Employee")]
        public PeopleCategory UpdatePeopleCategory(PeopleCategory people)
        {
            _context.PeopleCategories.Update(people);
            _context.SaveChanges();

            return people;
        }

        [HttpDelete("/peopleCategory/{id}")]
        [Authorize(Roles = "Employee")]
        public PeopleCategory DeletePeopleCategory(int id)
        {
            PeopleCategory peopleForDelete = _context.PeopleCategories.Find(id);
            _context.PeopleCategories.Remove(peopleForDelete);
            _context.SaveChanges();

            return peopleForDelete;
        }
    }
}
