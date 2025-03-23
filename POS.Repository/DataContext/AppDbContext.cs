using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using POS.Domain.Models;
using POS.Domain.Models.SalesOrders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Repository.DataContext
{
    public class AppDbContext:DbContext
    {
        private readonly IConfiguration _configuration;
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration) : base(options) { }
        public AppDbContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-LDQS1M7;Database=POS;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(user => user.Role)
                .HasConversion<string>();

            modelBuilder.Entity<UserBranches>()
            .HasOne(ub => ub.User)
            .WithMany(u => u.UserBranches)
            .HasForeignKey(ub => ub.UserId);

            modelBuilder.Entity<UserBranches>()
                .HasOne(ub => ub.Branches)
                .WithMany(b => b.UserBranches)
                .HasForeignKey(ub => ub.BranchId);

            modelBuilder.Entity<OrderLine>()
                .HasOne(ol => ol.OrderHeader)
                .WithMany(oh => oh.OrderLines)
                .HasForeignKey(ol => ol.OrderHeaderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderLine>()
                .HasOne(ol => ol.Product)
                .WithMany()
                .HasForeignKey(ol => ol.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Product>().HasData(
                // Electronics
                new Product { Id = 101, Name = "Laptop", Price = 1200, CategoryId = 1, Stock = 10 },
                new Product { Id = 102, Name = "Tablet", Price = 400, CategoryId = 1, Stock = 15 },
                new Product { Id = 103, Name = "Smartphone", Price = 800, CategoryId = 1, Stock = 20 },
                new Product { Id = 104, Name = "Smartwatch", Price = 250, CategoryId = 1, Stock = 25 },

                // Accessories
                new Product { Id = 201, Name = "Mouse", Price = 25, CategoryId = 2, Stock = 50 },
                new Product { Id = 202, Name = "Keyboard", Price = 50, CategoryId = 2, Stock = 40 },
                new Product { Id = 203, Name = "Headphones", Price = 75, CategoryId = 2, Stock = 30 },
                new Product { Id = 204, Name = "USB Cable", Price = 10, CategoryId = 2, Stock = 100 },

                // Home Appliances
                new Product { Id = 301, Name = "Microwave", Price = 150, CategoryId = 3, Stock = 8 },
                new Product { Id = 302, Name = "Refrigerator", Price = 1000, CategoryId = 3, Stock = 5 },
                new Product { Id = 303, Name = "Washing Machine", Price = 700, CategoryId = 3, Stock = 7 },
                new Product { Id = 304, Name = "Vacuum Cleaner", Price = 200, CategoryId = 3, Stock = 12 },

                // Gaming
                new Product { Id = 401, Name = "PlayStation 5", Price = 500, CategoryId = 4, Stock = 6 },
                new Product { Id = 402, Name = "Xbox Series X", Price = 550, CategoryId = 4, Stock = 5 },
                new Product { Id = 403, Name = "Gaming Chair", Price = 300, CategoryId = 4, Stock = 10 },
                new Product { Id = 404, Name = "VR Headset", Price = 400, CategoryId = 4, Stock = 8 },

                // Beverages
                new Product { Id = 501, Name = "Coffee", Price = 5, CategoryId = 5, Stock = 100 },
                new Product { Id = 502, Name = "Tea", Price = 4, CategoryId = 5, Stock = 80 },
                new Product { Id = 503, Name = "Juice", Price = 6, CategoryId = 5, Stock = 60 },
                new Product { Id = 504, Name = "Soft Drink", Price = 3, CategoryId = 5, Stock = 120 }
            );

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Branches> Branches { get; set; }
        public DbSet<UserBranches> UserBranches { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<OrderHeader> OrderHeaders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<Cashier> Cashier { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

    }
}
