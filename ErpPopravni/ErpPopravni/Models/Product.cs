using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ErpPopravni.Models
{
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Amount { get; set; }
        public string? Image { get; set; }
        [Required]
        public ProductCategory ProductCategory { get; set; }

        public IList<PeopleCategory> PeopleCategories { get; set; }
        [JsonIgnore]
        public IList<Review> Reviews { get; set; }
    }
}
