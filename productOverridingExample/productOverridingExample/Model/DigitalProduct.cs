namespace productOverridingExample.Model
{
    public class DigitalProduct : Product
    {
        public double Discount { get; set; }

        // Override CalculatePrice to apply discount
        public override double CalculatePrice()
        {
            return BasePrice - Discount;
        }
    }
}
