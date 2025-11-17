var Pizza = /** @class */ (function () {
    function Pizza(size, cheese, pepperoni, mushrooms) {
        if (cheese === void 0) { cheese = false; }
        if (pepperoni === void 0) { pepperoni = false; }
        if (mushrooms === void 0) { mushrooms = false; }
        this.size = size;
        this.cheese = cheese;
        this.pepperoni = pepperoni;
        this.mushrooms = mushrooms;
    }
    Pizza.prototype.describe = function () {
        var tops = [];
        if (this.cheese)
            tops.push('cheese');
        if (this.pepperoni)
            tops.push('pepperoni');
        if (this.mushrooms)
            tops.push('mushrooms');
        return "Pizza (".concat(this.size, ") with ").concat(tops.length ? tops.join(', ') : 'no toppings', ".");
    };
    return Pizza;
}());
var PizzaBuilder = /** @class */ (function () {
    function PizzaBuilder() {
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
    }
    PizzaBuilder.prototype.setSize = function (size) { this.size = size; return this; };
    PizzaBuilder.prototype.addCheese = function () { this.cheese = true; return this; };
    PizzaBuilder.prototype.addPepperoni = function () { this.pepperoni = true; return this; };
    PizzaBuilder.prototype.addMushrooms = function () { this.mushrooms = true; return this; };
    PizzaBuilder.prototype.build = function () {
        if (!this.size)
            throw new Error('size is required');
        return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
    };
    return PizzaBuilder;
}());
var pizza = new PizzaBuilder()
    .setSize('large')
    .addCheese()
    .addMushrooms()
    .build();
console.log(pizza.describe());
