import { Beverage } from "./IBeverage";

export class LemonTea implements Beverage {
  getDescription(): string {
    return "LemonTea";
  }
  getCost(): number {
    return 40;
  }
}
