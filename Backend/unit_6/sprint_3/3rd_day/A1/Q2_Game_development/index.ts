

class GameCharacter {
  constructor(
    public name: string,
    public level: number,
    public weapon: string
  ) {}

  clone(): GameCharacter {
  return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
}

}

function main() {
  const warrior = new GameCharacter("Warrior", 10, "Sword");
  const warriorClone = warrior.clone();
  warriorClone.name = "Warrior Clone";

  console.log("Original:", warrior);
  console.log("Clone:", warriorClone);
}

main();
