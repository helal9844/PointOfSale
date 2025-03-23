using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Domain.DTOs.SalesOrder
{
    public class OrderHeaderDTO
    {
        public int SessionId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public List<OrderLineDTO> OrderLines { get; set; } = new List<OrderLineDTO>();
    }
}
