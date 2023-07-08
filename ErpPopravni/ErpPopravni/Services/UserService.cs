using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ErpPopravni.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;

        public UserService (IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public LoginResponseDTO Authentication(User user)
        {
            if (user != null)
            {
                var response = generateJwtToken(user);
                return response;
            }
            return null;
        }

        private LoginResponseDTO generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();

            claims.Add(new Claim("userId", user.UserID.ToString()));

            var role = user.IsEmployee ? "Employee" : "Customer";

            claims.Add(new Claim(ClaimTypes.Role, role));

            var token = new JwtSecurityToken("Butik", null, claims, DateTime.Now, DateTime.Now.AddHours(2), signingCredentials);

            LoginResponseDTO response = new LoginResponseDTO();
            response.userToken = tokenHandler.WriteToken(token);
            response.role = role;
            response.userId = user.UserID;

            return response;
        }
    }
}
