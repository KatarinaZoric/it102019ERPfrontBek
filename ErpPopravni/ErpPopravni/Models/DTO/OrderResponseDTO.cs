using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Models.DTO
{
    public class OrderResponseDTO
    {
        public DateTime date { get; set; }
        public OrderItemResponseDTO[] items { get; set; }
    }
}
