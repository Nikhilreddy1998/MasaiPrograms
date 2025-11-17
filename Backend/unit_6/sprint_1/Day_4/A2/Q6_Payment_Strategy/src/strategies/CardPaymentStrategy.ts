import { IPaymentStrategy } from "./IPaymentStrategy";


export class CardPaymentStrategy implements IPaymentStrategy{
    process(amount: number): void {
        console.log(`${amount} Rs. paid using Card `)
    }
}