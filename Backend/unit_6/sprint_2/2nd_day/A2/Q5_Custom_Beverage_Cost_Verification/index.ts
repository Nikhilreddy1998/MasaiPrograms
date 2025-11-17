

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

class Cofee extends Beverage{
    getDescription(): string {
        return "Coffee"
    }
    getCost(): number {
        return 50
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

class Honey extends ToppingDecorator{
    getDescription(): string {
        return this.baseBevarage.getDescription() + " + Honey"
    }
    getCost(): number {
        return this.baseBevarage.getCost() + 20
    }
}

class WhippedCream extends ToppingDecorator{
    getDescription(): string {
        return this.baseBevarage.getDescription() + " + WhippedCream"
    }
    getCost(): number {
        return this.baseBevarage.getCost() + 15
    }
}

const myDrink = new WhippedCream(new Honey(new Sugar(new Cofee)))
console.log(myDrink.getDescription())
console.log(myDrink.getCost())