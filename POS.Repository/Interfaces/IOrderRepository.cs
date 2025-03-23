using POS.Domain.Models.SalesOrders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Repository.Interfaces
{
    public interface IOrderRepository:IGenricRepository<OrderHeader>
    {
        Task<IEnumerable<OrderHeader>> GetOrdersBySessionIdAsync(int sessionId);
    }
}
