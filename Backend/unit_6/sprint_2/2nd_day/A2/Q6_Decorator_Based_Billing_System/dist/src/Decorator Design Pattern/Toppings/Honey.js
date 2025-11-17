"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Honey = void 0;
const ToppingDecorator_1 = require("./ToppingDecorator");
class Honey extends ToppingDecorator_1.ToppingDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost() {
        return this.beverage.getCost() + 20;
    }
}
exports.Honey = Honey;
