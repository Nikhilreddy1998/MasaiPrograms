import { FlyStrategy } from "./strategies/IFlyStrategy";

export class Duck{
    private flyStrategy:FlyStrategy
    constructor(strategy:FlyStrategy){
        this.flyStrategy = strategy
    }

    performFly():void{
        this.flyStrategy.fly()
    }

    setFlyStrategy(strategy:FlyStrategy):void{
        this.flyStrategy = strategy
    }
}
