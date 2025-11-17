import { IShippingStrategy } from "./IShippingStrategy";

export class StandardShipping implements IShippingStrategy {
  calculate(): number {
    return 50;
  }
}
