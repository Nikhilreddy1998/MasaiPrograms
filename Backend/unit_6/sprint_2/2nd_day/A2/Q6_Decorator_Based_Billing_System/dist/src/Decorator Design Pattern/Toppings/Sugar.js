"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sugar = void 0;
const ToppingDecorator_1 = require("./ToppingDecorator");
class Sugar extends ToppingDecorator_1.ToppingDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
exports.Sugar = Sugar;
