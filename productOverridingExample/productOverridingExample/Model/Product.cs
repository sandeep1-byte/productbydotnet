namespace productOverridingExample.Model
{
    public class Product
    {
        public string Name { get; set; }
        public double BasePrice { get; set; }

        // Virtual method for calculating price
        public virtual double CalculatePrice()
        {
            return BasePrice; // Default implementation
        }
    }
}
