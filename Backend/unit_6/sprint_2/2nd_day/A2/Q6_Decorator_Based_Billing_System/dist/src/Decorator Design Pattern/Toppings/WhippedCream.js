"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhippedCream = void 0;
const ToppingDecorator_1 = require("./ToppingDecorator");
class WhippedCream extends ToppingDecorator_1.ToppingDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + WhippedCream";
    }
    getCost() {
        return this.beverage.getCost() + 15;
    }
}
exports.WhippedCream = WhippedCream;
