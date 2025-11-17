import { IPaymentStrategy } from "./IPaymentStrategy";


export class UPIIPaymentStrategy implements IPaymentStrategy{
    process(amount: number): void {
        console.log(`${amount} Rs. paid using UPI `)
    }
}