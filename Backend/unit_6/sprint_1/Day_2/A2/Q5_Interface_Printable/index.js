var Document1 = /** @class */ (function () {
    function Document1() {
    }
    Document1.prototype.print = function () {
        console.log("Printing Document...");
    };
    return Document1;
}());
var Photo = /** @class */ (function () {
    function Photo() {
    }
    Photo.prototype.print = function () {
        console.log("Printing Photo...");
    };
    return Photo;
}());
var Items = [new Document1(), new Photo()];
Items.forEach(function (ele) { return ele.print(); });
