using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ErpPopravni.Models
{
    public class Review
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReviewID { get; set; }
        [Required]
        public decimal Rating { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        [JsonIgnore]
        public Product Product { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
