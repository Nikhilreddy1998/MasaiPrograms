import { IShippingStrategy } from "./IShippingStrategy";

export class ExpressShipping implements IShippingStrategy {
  calculate(): number {
    return 100;
  }
}
