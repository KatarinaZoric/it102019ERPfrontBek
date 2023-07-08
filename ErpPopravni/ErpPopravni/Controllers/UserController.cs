using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ErpPopravni.Context;
using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using ErpPopravni.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ErpPopravni.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ButikContext _context;
        private IUserService _userService;

        public UserController(ButikContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }
     
        [HttpGet("")]
        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            return StatusCode(StatusCodes.Status200OK, user);
        }

        [HttpPost("")]
        [Authorize(Roles = "Employee")]
        public IActionResult AddUser([FromBody]UserDTO user)
        {
            var newUser = new User()
            {
                IsEmployee = false,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Password = user.Password,
                Username = user.Username
            };

            _context.Users.Add(newUser);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status201Created, newUser);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateUser(int id, [FromBody]UserDTO user)
        {
            var userFromDB = _context.Users.Find(id);

            if (userFromDB == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            //if (userFromDB.Password != user.Password)
            //{
            //    return StatusCode(StatusCodes.Status400BadRequest, "Lozinka nije tacna");
            //}

            userFromDB.Name = user.Name;
            userFromDB.Surname = user.Surname;
            userFromDB.Username = user.Username;
            userFromDB.Email = user.Email;
            userFromDB.Password = user.Password;

            _context.Users.Update(userFromDB);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, userFromDB);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            _context.Users.Remove(user);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status202Accepted, user);
        }


        /*##########################################################################################*/
        [AllowAnonymous]
        [HttpPost("/login")]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            if(login.Email == "" || login.Password == "")
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Morate popuniti sva polja");
            }

            var user = _context.Users.SingleOrDefault(u => u.Email == login.Email && u.Password == login.Password);
            var jwt = _userService.Authentication(user);

            if (jwt == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Neispravni podaci");
            }

            return StatusCode(StatusCodes.Status200OK, new { tokenRole = jwt });
        }

        [AllowAnonymous]
        [HttpPost("/register")]
        public IActionResult Register([FromBody] UserDTO user)
        {
            if (
                user.Name == "" ||
                user.Surname == "" ||
                user.Username == "" ||
                user.Email == "" ||
                user.Password == ""
            )
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Morate popuniti sva polja");
            }

            var userFromDB = _context.Users.SingleOrDefault(u => u.Email == user.Email);

            if (userFromDB != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Korisnik sa istom E-mail adresom vec postoji");
            }

            var newUser = new User()
            {
                IsEmployee = false,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Password = user.Password,
                Username = user.Username
            };

            _context.Users.Add(newUser);

            if (_context.SaveChanges() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            var jwt = _userService.Authentication(newUser);

            if (jwt == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return StatusCode(StatusCodes.Status200OK, new { tokenRole = jwt });
        }
       
    }
}
