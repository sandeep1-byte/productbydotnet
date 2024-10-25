using demo1.Models;
using Microsoft.EntityFrameworkCore;

namespace demo1.Services
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> users { get; set; }
    }
}
