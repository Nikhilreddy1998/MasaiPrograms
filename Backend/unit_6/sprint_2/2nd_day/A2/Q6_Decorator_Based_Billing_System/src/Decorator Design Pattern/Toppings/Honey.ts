import { ToppingDecorator } from "./ToppingDecorator"


export class Honey extends ToppingDecorator{
    getDescription(): string {
        return this.beverage.getDescription() + " + Honey"
    }
    getCost(): number {
        return this.beverage.getCost() + 20
    }
}
