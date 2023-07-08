using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ErpPopravni.Models
{
    [Table("OrderItems")]
  
        public class OrderItem
        {
            [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int OrderItemID { get; set; }
            [Required, JsonIgnore]
        public Order Order { get; set; }
            [Required]
        public Product Product { get; set; }
            [Required]
            public decimal Price { get; set; }
            [Required]
            public int Amount { get; set; }
        }
    
}
