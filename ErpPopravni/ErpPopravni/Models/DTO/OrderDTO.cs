using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Models.DTO
{
    public class OrderDTO
    {
        public OrderItemDTO[] OrderItems { get; set; }
    }
}
