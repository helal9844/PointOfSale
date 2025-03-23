using POS.Domain.Models.SalesOrders;
using POS.Repository.Interfaces;
using POS.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Service.Services
{
    public class OrderService:IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<IEnumerable<OrderHeader>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllAsync();
        }
        public async Task<OrderHeader> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetByIdAsync(id);
        }
        public async Task AddOrderAsync(OrderHeader order)
        {
            await _orderRepository.AddAsync(order);
        }
        public async Task UpdateOrderAsync(OrderHeader order)
        {
            await _orderRepository.UpdateAsync(order);
        }
        public async Task DeleteOrderAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order != null)
            {
                await _orderRepository.DeleteAsync(order);
            }
        }
        public async Task<IEnumerable<OrderHeader>> GetOrdersBySessionIdAsync(int sessionId)
        {
            return await _orderRepository.GetOrdersBySessionIdAsync(sessionId);
        }
    }
}
