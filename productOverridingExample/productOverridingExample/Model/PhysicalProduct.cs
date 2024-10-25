namespace productOverridingExample.Model
{
    public class PhysicalProduct : Product
    {
        public double ShippingCost { get; set; }

        // Override CalculatePrice to include shipping
        public override double CalculatePrice()
        {
            return BasePrice + ShippingCost;
        }
    }
}
