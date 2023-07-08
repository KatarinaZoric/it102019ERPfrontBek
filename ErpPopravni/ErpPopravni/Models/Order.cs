using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Models
{
    

    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public decimal Total { get; set; }
        public virtual IList<OrderItem> OrderItems { get; set; }
    }
}
