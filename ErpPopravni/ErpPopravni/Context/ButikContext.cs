using Microsoft.EntityFrameworkCore;
using ErpPopravni.Models;

namespace ErpPopravni.Context
{
    public class ButikContext : DbContext
    {
        public ButikContext(DbContextOptions<ButikContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<PeopleCategory> PeopleCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}

