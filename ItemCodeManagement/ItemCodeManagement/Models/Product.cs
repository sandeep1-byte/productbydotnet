using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ItemCodeManagement.Models
{
    public class Product
    {
        public int id { get;set; }

        [MaxLength(100)]
        public string Name { get; set; } = "";

        [MaxLength(100)]
        public string Brand { get; set; } = "";
        public string Category { get; set; } = "";

        [Precision(16,2)]
        public decimal? Price { get;set; }
        public string Description { get; set; } = "";
    }
}
