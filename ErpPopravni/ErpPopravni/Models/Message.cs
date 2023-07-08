using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ErpPopravni.Models
{
    public class Message
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MessageID { get; set; }
        [Required]
        public string MessageText { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required, JsonIgnore]

        public Question Question { get; set; }

        [Required]
        public User User { get; set; }
    }
}
