import { Espresso } from "./src/Decorator Design Pattern/Bevarages/Espresso"
import { LemonTea } from "./src/Decorator Design Pattern/Bevarages/LemonTea"
import { Honey } from "./src/Decorator Design Pattern/Toppings/Honey"
import { Sugar } from "./src/Decorator Design Pattern/Toppings/Sugar"
import { WhippedCream } from "./src/Decorator Design Pattern/Toppings/WhippedCream"

const order1 = new Honey(new WhippedCream(new Espresso()))
const order2 = new Sugar(new Sugar(new LemonTea()))

console.log(`Order 1: ${order1.getDescription()}`)
console.log(`Cost 1: ₹${order1.getCost()}`)

console.log(`Order 2: ${order2.getDescription()}`)
console.log(`Cost 2: ₹${order2.getCost()}`)