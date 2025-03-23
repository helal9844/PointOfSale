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
    public class OrderRepository:GenricRepository<OrderHeader>,IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<OrderHeader>> GetOrdersBySessionIdAsync(int sessionId)
        {
            return await _context.Set<OrderHeader>()
                .Where(o => o.SessionId == sessionId)
                .ToListAsync();
        }
    }
}
