var AppleLaptop = /** @class */ (function () {
    function AppleLaptop() {
    }
    AppleLaptop.prototype.specifications = function () {
        console.log("Apple Laptop: MacBook Pro with M3 chip.");
    };
    return AppleLaptop;
}());
var ApplePhone = /** @class */ (function () {
    function ApplePhone() {
    }
    ApplePhone.prototype.specifications = function () {
        console.log("Apple Phone: iPhone 15 Pro Max.");
    };
    return ApplePhone;
}());
var SamsungLaptop = /** @class */ (function () {
    function SamsungLaptop() {
    }
    SamsungLaptop.prototype.specifications = function () {
        console.log("Samsung Laptop: Galaxy Book3 Ultra.");
    };
    return SamsungLaptop;
}());
var SamsungPhone = /** @class */ (function () {
    function SamsungPhone() {
    }
    SamsungPhone.prototype.specifications = function () {
        console.log("Samsung Phone: Galaxy S24 Ultra.");
    };
    return SamsungPhone;
}());
var AppleFactory = /** @class */ (function () {
    function AppleFactory() {
    }
    AppleFactory.prototype.createDevice = function (type) {
        if (type.toLowerCase() === "laptop") {
            return new AppleLaptop();
        }
        else if (type.toLowerCase() === "phone") {
            return new ApplePhone();
        }
        throw new Error("Unknown Apple device type");
    };
    return AppleFactory;
}());
var SamsungFactory = /** @class */ (function () {
    function SamsungFactory() {
    }
    SamsungFactory.prototype.createDevice = function (type) {
        if (type.toLowerCase() === "laptop") {
            return new SamsungLaptop();
        }
        else if (type.toLowerCase() === "phone") {
            return new SamsungPhone();
        }
        throw new Error("Unknown Samsung device type");
    };
    return SamsungFactory;
}());
var appleFactory = new AppleFactory();
var samsungFactory = new SamsungFactory();
var appleLaptop = appleFactory.createDevice("laptop");
var samsungPhone = samsungFactory.createDevice("phone");
appleLaptop.specifications();
samsungPhone.specifications();
