"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duck = void 0;
class Duck {
    constructor(strategy) {
        this.flyStrategy = strategy;
    }
    performFly() {
        this.flyStrategy.fly();
    }
    setFlyStrategy(strategy) {
        this.flyStrategy = strategy;
    }
}
exports.Duck = Duck;
