import { ShippingContext } from "./src/ShippingContext";
import { ExpressShipping } from "./src/ShippingStrategies/ExpressShipping";
import { OneDayShipping } from "./src/ShippingStrategies/OneDayShipping";
import { StandardShipping } from "./src/ShippingStrategies/StandardShipping";

// A class should be open for extension but closed for modification

const shipping = new ShippingContext(new StandardShipping())
console.log(shipping.costCalculate())

shipping.setShippingStrategy(new ExpressShipping())
console.log(shipping.costCalculate())

shipping.setShippingStrategy(new OneDayShipping)
console.log(shipping.costCalculate())