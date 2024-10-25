//using AspCoreWebApiCRUD.Models;?
using itemcodewebApi.Model;
using Microsoft.EntityFrameworkCore;

namespace itemcodewebApi.Services
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<User>Users { get; set; }

    }
}



