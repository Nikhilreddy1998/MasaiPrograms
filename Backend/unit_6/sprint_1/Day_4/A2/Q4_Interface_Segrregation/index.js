// Class should not be forced to implements methods its doesn't need
var OldPrinter = /** @class */ (function () {
    function OldPrinter() {
    }
    OldPrinter.prototype.print = function () {
        console.log("OldPrinter is printing....");
    };
    return OldPrinter;
}());
var SmartPrinter = /** @class */ (function () {
    function SmartPrinter() {
    }
    SmartPrinter.prototype.print = function () {
        console.log("SmartPrinter is printing...");
    };
    SmartPrinter.prototype.scan = function () {
        console.log("SmartPrinter is scanning...");
    };
    SmartPrinter.prototype.fax = function () {
        console.log("SmartPrinter is sending a fax...");
    };
    return SmartPrinter;
}());
// This will only prints
var oldPrinter = new OldPrinter();
oldPrinter.print();
// This will print, scan & use for sending fax
var smartPrinter = new SmartPrinter();
smartPrinter.fax();
smartPrinter.scan();
smartPrinter.print();
