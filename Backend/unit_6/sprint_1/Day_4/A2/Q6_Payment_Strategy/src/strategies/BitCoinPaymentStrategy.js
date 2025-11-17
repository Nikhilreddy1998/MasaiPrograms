"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitCoinPaymentStrategy = void 0;
var BitCoinPaymentStrategy = /** @class */ (function () {
    function BitCoinPaymentStrategy() {
    }
    BitCoinPaymentStrategy.prototype.process = function (amount) {
        console.log("".concat(amount, " Rs. paid using BitCoin "));
    };
    return BitCoinPaymentStrategy;
}());
exports.BitCoinPaymentStrategy = BitCoinPaymentStrategy;
