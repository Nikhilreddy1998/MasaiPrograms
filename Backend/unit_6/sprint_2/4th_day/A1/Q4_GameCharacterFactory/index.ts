

interface Character {
  getStats(): string
}

class Warrior implements Character {
  constructor(private name: string) {}

  getStats(): string {
    return `Warrior ${this.name} - Strength: 90, Defense: 80`
  }
}

class Archer implements Character {
  constructor(private name: string) {}

  getStats(): string {
    return `Archer ${this.name} - Agility: 80, Strength: 40`
  }
}

class Mage implements Character {
  constructor(private name: string) {}

  getStats(): string {
    return `Mage ${this.name} - Intelligence: 90, Mana: 100`
  }
}

class CharacterFactory {
  static createCharacter(type: string, name: string): Character {
    if (type === "Warrior") return new Warrior(name)
    if (type === "Archer") return new Archer(name)
    if (type === "Mage") return new Mage(name)
    throw new Error("Invalid character type")
  }
}

const archer = CharacterFactory.createCharacter("Archer", "Eldrin")
console.log(archer.getStats())

const mage = CharacterFactory.createCharacter("Mage", "Gandalf")
console.log(mage.getStats())
