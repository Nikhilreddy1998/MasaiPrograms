class Car {
  constructor(
    public brand: string,
    public engine: string,
    public color: string,
    public sunroof: boolean,
    public automaticTransmission: boolean
  ) {}

  describe(): string {
    return `${this.brand} with ${this.engine} engine, color: ${this.color}, ` +
      `Sunroof: ${this.sunroof ? 'Yes' : 'No'}, Automatic Transmission: ${this.automaticTransmission ? 'Yes' : 'No'}`;
  }
}

class CarBuilder {
  private brand!: string;
  private engine!: string;
  private color!: string;
  private sunroof = false;
  private automaticTransmission = false;

  setBrand(brand: string) { this.brand = brand; return this; }
  setEngine(engine: string) { this.engine = engine; return this; }
  setColor(color: string) { this.color = color; return this; }
  addSunroof() { this.sunroof = true; return this; }
  addAutomaticTransmission() { this.automaticTransmission = true; return this; }

  build(): Car {
    if (!this.brand || !this.engine || !this.color) {
      throw new Error('Brand, engine, and color are required.');
    }
    return new Car(this.brand, this.engine, this.color, this.sunroof, this.automaticTransmission);
  }
}

function main() {
  const teslaModelS = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .addAutomaticTransmission()
    .build();

  console.log(teslaModelS.describe());
}

main();
