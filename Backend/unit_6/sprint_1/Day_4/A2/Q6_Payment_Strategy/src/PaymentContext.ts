import { IPaymentStrategy } from "./strategies/IPaymentStrategy";


export class PaymentContext{
    private mode:IPaymentStrategy
    constructor(mode:IPaymentStrategy){
        this.mode = mode
    }

    setPaymentMode(mode:IPaymentStrategy){
        this.mode = mode
    }

    process(amount:number):void{
        this.mode.process(amount)
    }
}