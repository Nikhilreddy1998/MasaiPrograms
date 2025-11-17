"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPaymentStrategy = void 0;
var CardPaymentStrategy = /** @class */ (function () {
    function CardPaymentStrategy() {
    }
    CardPaymentStrategy.prototype.process = function (amount) {
        console.log("".concat(amount, " Rs. paid using Card "));
    };
    return CardPaymentStrategy;
}());
exports.CardPaymentStrategy = CardPaymentStrategy;
