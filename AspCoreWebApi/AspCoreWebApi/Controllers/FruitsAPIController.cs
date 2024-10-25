using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspCoreWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FruitsAPIController : ControllerBase
    {
        public List<string> fruits = new List<string>()
        {
         "Apple",
         "Banana",
         "jdjsd",
         "ddddfd",
         "fddfdf"
        };

        [HttpGet]
        public List<string> GetFruits()
        {
            return fruits;
        }

        [HttpGet ("{id}")]
        public string GetFruitsByIndex(int id)
        { 
            return fruits.ElementAt(id);
        }
    }
}
