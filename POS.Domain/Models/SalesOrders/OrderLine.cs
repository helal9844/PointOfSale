using System.Text.Json.Serialization;

namespace POS.Domain.Models.SalesOrders
{
    public class OrderLine
    {
        public int Id { get; set; }
        public int OrderHeaderId { get; set; }
        [JsonIgnore]
        public OrderHeader OrderHeader { get; set; }

        public int ProductId { get; set; }
        [JsonIgnore]

        public Product? Product { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal LineTotal => Quantity * Price;
    }
}