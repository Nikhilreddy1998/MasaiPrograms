var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Q1: Basic Inheritance
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.swim = function () {
        console.log("I know swimming");
    };
    return Duck;
}());
var D1 = new Duck();
D1.swim();
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MallardDuck;
}(Duck));
var mallardDuck1 = new MallardDuck();
mallardDuck1.swim();
// Q2: Method Overriding Basics
var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.fly = function () {
        console.log("I can fly");
    };
    return Bird;
}());
var Penguin = /** @class */ (function (_super) {
    __extends(Penguin, _super);
    function Penguin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Penguin.prototype.fly = function () {
        console.log("I cannot fly");
    };
    return Penguin;
}(Bird));
var bird1 = new Bird();
var bird2 = new Penguin();
bird1.fly();
bird2.fly();
var ToyDuck = /** @class */ (function () {
    function ToyDuck() {
    }
    ToyDuck.prototype.swim = function () {
        console.log("Can float on water");
    };
    ToyDuck.prototype.fly = function () {
        console.log("Cannot fly");
    };
    ToyDuck.prototype.sound = function () {
        console.log("Cannot sound");
    };
    return ToyDuck;
}());
var toyDuck = new ToyDuck();
toyDuck.fly();
toyDuck.sound();
toyDuck.swim();
