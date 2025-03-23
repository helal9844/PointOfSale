using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS.Domain.Models.SalesOrders
{
    public class OrderHeader
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        [JsonIgnore]

        public Cashier Session { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public List<OrderLine> OrderLines { get; set; } = new List<OrderLine>();
    }
}
