"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingContext = void 0;
class ShippingContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setShippingStrategy(strategy) {
        this.strategy = strategy;
    }
    costCalculate() {
        return this.strategy.calculate();
    }
}
exports.ShippingContext = ShippingContext;
