


abstract class Beverage{
    abstract getDescription():string;
    abstract getCost():number;
}

class GreenTea extends Beverage{
    getDescription(): string {
        return "Green Tea"
    }
    getCost(): number {
        return 40
    }
}

abstract class ToppingDecorator extends Beverage{
    protected baseBevarage:Beverage
    constructor(baseBevarage:Beverage){
        super()
        this.baseBevarage = baseBevarage
    }
    abstract getDescription(): string;
    abstract getCost(): number;
}

class Sugar extends ToppingDecorator{
    getDescription(): string {
       return this.baseBevarage.getDescription() + " + Sugar"
    }
    getCost(): number {
        return this.baseBevarage.getCost() + 10
    }
}

const tea = new Sugar(new Sugar(new GreenTea()))
console.log(tea.getDescription())
console.log(tea.getCost())