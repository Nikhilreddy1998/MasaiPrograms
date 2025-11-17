// Objects of a superclass should be able to be replace with   objects of subclass without affecting the program
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.move = function () {
        console.log("Bird is moving");
    };
    return Bird;
}());
var Parrot = /** @class */ (function (_super) {
    __extends(Parrot, _super);
    function Parrot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parrot.prototype.fly = function () {
        console.log("Parrot is Flying");
    };
    return Parrot;
}(Bird));
// Ostrich cant fly so I change superclass with subclass,
//  now ostrich will not able to access to fly only run & move 
// will work 
var Ostrich = /** @class */ (function (_super) {
    __extends(Ostrich, _super);
    function Ostrich() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ostrich.prototype.run = function () {
        console.log("Ostrich is running fast");
    };
    return Ostrich;
}(Bird));
var parrot = new Parrot();
parrot.fly();
var ostrich = new Ostrich();
ostrich.move();
ostrich.run();
// ostrich.fly() // Compile-error
