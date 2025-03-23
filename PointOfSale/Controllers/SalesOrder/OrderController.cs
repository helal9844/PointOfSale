using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS.Domain.DTOs.SalesOrder;
using POS.Domain.Models.SalesOrders;
using POS.Service.Interfaces;

namespace PointOfSale.Controllers.SalesOrder
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderHeader>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderHeader>> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
                return NotFound();
            return Ok(order);
        }
        [HttpPost]
        public async Task<ActionResult> CreateOrder(OrderHeaderDTO orderDto)
        {
            var order = _mapper.Map<OrderHeader>(orderDto);
            await _orderService.AddOrderAsync(order);
            var responseDto = _mapper.Map<OrderHeaderDTO>(order);

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, OrderHeader order)
        {
            if (id != order.Id)
                return BadRequest("Order ID mismatch");

            await _orderService.UpdateOrderAsync(order);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            await _orderService.DeleteOrderAsync(id);
            return NoContent();
        }
        [HttpGet("session/{sessionId}")]
        public async Task<ActionResult<IEnumerable<OrderHeader>>> GetOrdersBySessionId(int sessionId)
        {
            var orders = await _orderService.GetOrdersBySessionIdAsync(sessionId);
            return Ok(orders);
        }
    }
}
