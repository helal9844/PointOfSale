using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS.Domain.Models.SalesOrders;
using POS.Service.Interfaces;

namespace PointOfSale.Controllers.SalesOrder
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            var Categorys = await _categoryService.GetAllCategories();
            return Ok(Categorys);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            var Category = await _categoryService.GetCategoryById(id);
            if (Category == null)
                return NotFound();
            return Ok(Category);
        }
        [HttpPost]
        public async Task<ActionResult> Create(Category Category)
        {
            await _categoryService.CreateCategory(Category);
            return CreatedAtAction(nameof(Get), new { id = Category.Id }, Category);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Category Category)
        {
            if (id != Category.Id)
                return BadRequest();

            await _categoryService.UpdateCategory(Category);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Category Category)
        {
            await _categoryService.DeleteCategory(Category);
            return NoContent();
        }
    }
}
