using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Models.DTO
{
    public class OrderItemResponseDTO
    {
        public string product { get; set; }
        public decimal price { get; set; }
        public int amount { get; set; }
    }
}
