

export interface IPaymentStrategy{
    process(amount:number):void;
}