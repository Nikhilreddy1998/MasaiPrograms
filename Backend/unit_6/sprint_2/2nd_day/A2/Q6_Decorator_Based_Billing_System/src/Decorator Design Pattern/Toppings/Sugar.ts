import {ToppingDecorator} from './ToppingDecorator'

export class Sugar extends ToppingDecorator{
    getDescription(): string {
       return this.beverage.getDescription() + " + Sugar"
    }
    getCost(): number {
        return this.beverage.getCost() + 10
    }
}