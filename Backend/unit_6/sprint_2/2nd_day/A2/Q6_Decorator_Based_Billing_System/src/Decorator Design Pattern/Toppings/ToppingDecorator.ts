import { Beverage } from "../Bevarages/IBeverage";

export abstract class ToppingDecorator implements Beverage {
  protected beverage: Beverage;
  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }
  abstract getDescription(): string;
  abstract getCost(): number;
}
