
using Microsoft.EntityFrameworkCore;
using POS.Domain.Models.SalesOrders;
using POS.Repository.DataContext;
using POS.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Repository.Repositories
{
    public class ProductRepository :GenricRepository<Product>, IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context):base(context) 
        {
            _context = context;
        }

        
    }
}
