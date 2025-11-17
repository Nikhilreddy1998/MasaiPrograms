"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentContext = void 0;
class PaymentContext {
    constructor(mode) {
        this.mode = mode;
    }
    setPaymentMode(mode) {
        this.mode = mode;
    }
    process(amount) {
        this.mode.process(amount);
    }
}
exports.PaymentContext = PaymentContext;
