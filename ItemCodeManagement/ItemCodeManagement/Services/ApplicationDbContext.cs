using ItemCodeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ItemCodeManagement.Services
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product>Products { get; set; } 
    }
}
