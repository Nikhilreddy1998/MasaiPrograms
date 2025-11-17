import { Duck } from "./src/duck";
import { FastFly } from "./src/strategies/FastFly";
import { NoFly } from "./src/strategies/NoFly";


const duck = new Duck(new FastFly())
duck.performFly()

duck.setFlyStrategy(new NoFly())
duck.performFly()