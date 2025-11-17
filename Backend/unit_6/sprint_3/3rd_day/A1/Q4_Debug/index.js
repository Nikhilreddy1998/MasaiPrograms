var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Book = /** @class */ (function () {
    function Book(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    Book.prototype.clone = function () {
        return new Book(this.title, this.author, __spreadArray([], this.reviews, true));
    };
    return Book;
}());
var reviews = ["Excellent!", "Very Informative"];
var original = new Book("Design Patterns", "GoF", reviews);
var cloned = original.clone();
cloned.reviews.push("Must Read");
console.log("Original Book Reviews:", original.reviews);
console.log("Cloned Book Reviews:", cloned.reviews);
