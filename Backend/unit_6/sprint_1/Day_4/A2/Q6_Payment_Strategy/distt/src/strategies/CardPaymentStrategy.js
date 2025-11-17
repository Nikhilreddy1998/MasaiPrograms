"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPaymentStrategy = void 0;
class CardPaymentStrategy {
    process(amount) {
        console.log(`${amount} Rs. paid using Card `);
    }
}
exports.CardPaymentStrategy = CardPaymentStrategy;
