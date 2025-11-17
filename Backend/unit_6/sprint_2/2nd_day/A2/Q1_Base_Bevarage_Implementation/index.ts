

abstract class Bevarage{
    abstract getDescription():string;
    abstract getCost():number;
}

class GreenTea extends Bevarage{
    getDescription(): string {
        return "Green tea"
    }
    getCost(): number {
       return 40
    }
}

const tea = new GreenTea()
console.log(tea.getDescription())
console.log(tea.getCost())