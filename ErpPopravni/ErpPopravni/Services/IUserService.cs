using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Services
{
   public interface IUserService
    {
        public LoginResponseDTO Authentication(User user);
    }
}
