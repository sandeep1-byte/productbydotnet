using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using productOverridingExample.Model;

namespace productOverridingExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // Method Overloading Example
        [HttpGet("calculate/{basePrice}")]
        public IActionResult Calculate(double basePrice)
        {
            return Ok(basePrice); // Simple calculation
        }

        [HttpGet("calculate/{basePrice}/{shippingCost}")]
        public IActionResult Calculate(double basePrice, double shippingCost)
        {
            double totalPrice = basePrice + shippingCost;
            return Ok(totalPrice);
        }

        [HttpGet("physicalproduct/price/{name}/{basePrice}/{shippingCost}")]
        public IActionResult GetPhysicalProductPrice(string name, double basePrice, double shippingCost)
        {
            PhysicalProduct product = new PhysicalProduct
            {
                Name = name,
                BasePrice = basePrice,
                ShippingCost = shippingCost
            };
            double price = product.CalculatePrice();
            return Ok(price);
        }

        [HttpGet("digitalproduct/price/{name}/{basePrice}/{discount}")]
        public IActionResult GetDigitalProductPrice(string name, double basePrice, double discount)
        {
            DigitalProduct product = new DigitalProduct
            {
                Name = name,
                BasePrice = basePrice,
                Discount = discount
            };
            double price = product.CalculatePrice();
            return Ok(price);
        }
    }
}
