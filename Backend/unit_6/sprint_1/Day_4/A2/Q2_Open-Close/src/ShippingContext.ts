import { IShippingStrategy } from "./ShippingStrategies/IShippingStrategy";

export class ShippingContext{
    private strategy:IShippingStrategy
    constructor(strategy:IShippingStrategy){
        this.strategy = strategy
    }
    setShippingStrategy(strategy:IShippingStrategy):void{
        this.strategy = strategy
    }

    costCalculate():number{
        return this.strategy.calculate()
    }
}