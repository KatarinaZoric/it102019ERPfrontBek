using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Models.DTO
{
    public class LoginResponseDTO
    {
        public string role { get; set; }
        public string userToken { get; set; }
        public int userId { get; set; }
    }
}
