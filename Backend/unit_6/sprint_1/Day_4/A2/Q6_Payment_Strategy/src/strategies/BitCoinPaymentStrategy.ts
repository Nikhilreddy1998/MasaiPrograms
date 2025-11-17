import { IPaymentStrategy } from "./IPaymentStrategy";


export class BitCoinPaymentStrategy implements IPaymentStrategy{
    process(amount: number): void {
        console.log(`${amount} Rs. paid using BitCoin `)
    }
}