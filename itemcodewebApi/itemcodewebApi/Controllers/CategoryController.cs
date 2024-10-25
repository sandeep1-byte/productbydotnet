using itemcodewebApi.Model;
using itemcodewebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace itemcodewebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public CategoryController(ApplicationDbContext context) {
            this.context = context;
        }


        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            // Validate the category
            if (category == null)
            {
                return BadRequest("Category cannot be null.");
            }

            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();

            // Return the created category with a 200 OK response
            return Ok(category);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound(); // Return 404 if the category is not found
            }

            return Ok(category); // Return the category with a 200 OK response
        }



        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await context.Categories.ToListAsync();
            return Ok(categories); // Return the list of categories with a 200 OK response
        }

        
        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> UpdateCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            context.Entry(category).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(category); // Changed to return 200 OK
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            context.Categories.Remove(category);
            await context.SaveChangesAsync();
            return Ok(); // Changed to return 200 OK
        }

    }
}
