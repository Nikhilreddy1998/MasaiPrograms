import { ToppingDecorator } from "./ToppingDecorator"


export class WhippedCream extends ToppingDecorator{
    getDescription(): string {
        return this.beverage.getDescription() + " + WhippedCream"
    }
    getCost(): number {
        return this.beverage.getCost() + 15
    }
}