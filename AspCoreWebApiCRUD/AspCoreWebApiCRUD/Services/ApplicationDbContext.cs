//using AspCoreWebApiCRUD.Models;?
using AspCoreWebApiCRUD.Model;
using Microsoft.EntityFrameworkCore;

namespace AspCoreWebApiCRUD.Services
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Student> Students { get; set; } 
        public DbSet<Employee> Employees { get; set; } 

    }
}


