using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ErpPopravni.Models
{
    public class PeopleCategory
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PeopleCategoryID { get; set; }
        [Required]
        public string Name { get; set; }
        [JsonIgnore]
        public IList<Product> Products { get; set; }
    }
}
