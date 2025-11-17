"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentContext = void 0;
var PaymentContext = /** @class */ (function () {
    function PaymentContext(mode) {
        this.mode = mode;
    }
    PaymentContext.prototype.setPaymentMode = function (mode) {
        this.mode = mode;
    };
    PaymentContext.prototype.process = function (amount) {
        this.mode.process(amount);
    };
    return PaymentContext;
}());
exports.PaymentContext = PaymentContext;
