using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS.Domain.Models.SalesOrders;
using POS.Service.Interfaces;

namespace PointOfSale.Controllers.SalesOrder
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }
        [HttpPost]
        public async Task<ActionResult> Create(Product product)
        {
            await _productService.CreateProduct(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Product product)
        {
            if (id != product.Id)
                return BadRequest();

            await _productService.UpdateProduct(product);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Product product)
        {
            await _productService.DeleteProduct(product);
            return NoContent();
        }
    }
}
