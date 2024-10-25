using ItemCodeManagement.Models;
using ItemCodeManagement.Services;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Drawing2D;

namespace ItemCodeManagement.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext context;

        public ProductsController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            var products = context.Products.ToList();
            return View(products);
        }
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(ProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return View(productDto);    
            }
            Product product = new Product()
            {
                Name = productDto.Name,
                Brand = productDto.Brand,
                Description = productDto.Description,
                Price = productDto.Price,   
                Category = productDto.Category,
            };
            context.Products.Add(product);
            context.SaveChanges();
            return RedirectToAction("Index","Products");
        }

        public IActionResult Edit(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
            {
                return RedirectToAction("Index", "Products");
            }
            var productDto = new ProductDto()
            {
                Name = product.Name,
                Brand = product.Brand,
                Description = product.Description,
                Price = product.Price,   
                Category = product.Category,
            };
            return View(productDto);
        }

        [HttpPost]
        public IActionResult Edit(int id,ProductDto productDto)
        {
            var product = context.Products.Find(id);

            if (product == null)
            {
                return RedirectToAction("Index", "Products");
            }
            if (!ModelState.IsValid)
            {
                return View(productDto);
            }
            product.Name = productDto.Name;
            product.Brand = productDto.Brand;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.Category = productDto.Category;

            context.SaveChanges();
            return RedirectToAction("Index", "Products");

        }
        public IActionResult Delete(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
            {
                return RedirectToAction("Index", "Products");
            }
            context.Products.Remove(product);
            context.SaveChanges();

            return RedirectToAction("Index","Products");
        }
    }
}
