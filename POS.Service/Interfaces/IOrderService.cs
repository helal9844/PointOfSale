using POS.Domain.Models.SalesOrders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Service.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderHeader>> GetAllOrdersAsync();
        Task<OrderHeader> GetOrderByIdAsync(int id);
        Task AddOrderAsync(OrderHeader order);
        Task UpdateOrderAsync(OrderHeader order);
        Task DeleteOrderAsync(int id);
        Task<IEnumerable<OrderHeader>> GetOrdersBySessionIdAsync(int sessionId);
    }
}
