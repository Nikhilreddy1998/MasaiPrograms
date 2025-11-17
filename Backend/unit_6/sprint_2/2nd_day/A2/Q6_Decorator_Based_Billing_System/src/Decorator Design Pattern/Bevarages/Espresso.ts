import { Beverage } from "./IBeverage";

export class Espresso implements Beverage {
  getDescription(): string {
    return "Espresso";
  }
  getCost(): number {
    return 80;
  }
}
