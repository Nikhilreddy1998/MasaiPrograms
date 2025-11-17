"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPIIPaymentStrategy = void 0;
var UPIIPaymentStrategy = /** @class */ (function () {
    function UPIIPaymentStrategy() {
    }
    UPIIPaymentStrategy.prototype.process = function (amount) {
        console.log("".concat(amount, " Rs. paid using UPI "));
    };
    return UPIIPaymentStrategy;
}());
exports.UPIIPaymentStrategy = UPIIPaymentStrategy;
