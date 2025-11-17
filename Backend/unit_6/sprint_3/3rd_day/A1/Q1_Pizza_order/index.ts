type Size = 'small' | 'medium' | 'large';

class Pizza {
  constructor(
    public size: Size,
    public cheese = false,
    public pepperoni = false,
    public mushrooms = false
  ) {}
  describe() {
    const tops: string[] = [];
    if (this.cheese) tops.push('cheese');
    if (this.pepperoni) tops.push('pepperoni');
    if (this.mushrooms) tops.push('mushrooms');
    return `Pizza (${this.size}) with ${tops.length ? tops.join(', ') : 'no toppings'}.`;
  }
}

class PizzaBuilder {
  private size?: Size;
  private cheese = false;
  private pepperoni = false;
  private mushrooms = false;

  setSize(size: Size): this { this.size = size; return this; }
  addCheese(): this { this.cheese = true; return this; }
  addPepperoni(): this { this.pepperoni = true; return this; }
  addMushrooms(): this { this.mushrooms = true; return this; }

  build(): Pizza {
    if (!this.size) throw new Error('size is required');
    return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
  }
}

const pizza = new PizzaBuilder()
    .setSize('large')
    .addCheese()
    .addMushrooms()
    .build();
console.log(pizza.describe())
