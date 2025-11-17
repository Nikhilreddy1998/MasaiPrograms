import { IShippingStrategy } from "./IShippingStrategy";


export class OneDayShipping implements IShippingStrategy{
    calculate(): number {
        return 250
    }
}