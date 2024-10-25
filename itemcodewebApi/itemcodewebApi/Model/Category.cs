using System.ComponentModel.DataAnnotations;

namespace itemcodewebApi.Model
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CategoryName { get; set; }
    }
}
