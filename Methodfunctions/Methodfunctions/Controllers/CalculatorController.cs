using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Methodfunctions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculatorController : ControllerBase
    {

        [HttpGet("add/{a}/{b}")]
        public IActionResult Add(int a, int b)
        {
            return Ok(a + b);
        }

        [HttpGet("add/{a}/{b}/{c}")]
        public IActionResult Add(int a, int b, int c)
        {
            return Ok(a + b + c);
        }
    }
}
