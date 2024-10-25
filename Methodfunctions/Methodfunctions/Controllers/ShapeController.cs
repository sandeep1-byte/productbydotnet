using Methodfunctions.Model;
using Microsoft.AspNetCore.Mvc;

namespace Methodfunctions.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class ShapeController : ControllerBase
        {
            [HttpGet("circle/area/{radius}")]
            public IActionResult GetCircleArea(double radius)
            {
                Circle circle = new Circle(radius);
                double area = circle.Area();
                return Ok(area);
            }
    }
}
