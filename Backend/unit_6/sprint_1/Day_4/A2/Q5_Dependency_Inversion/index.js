//  High-level modules should not depend on Low-level modules
// Both should be depende on abstraction
var MySQLService = /** @class */ (function () {
    function MySQLService() {
    }
    MySQLService.prototype.save = function (data) {
        console.log("Saving to SQL:", data);
    };
    return MySQLService;
}());
var UserService = /** @class */ (function () {
    function UserService(db) {
        this.db = db;
    }
    UserService.prototype.register = function (user) {
        this.db.save(user);
        console.log("User Registered");
    };
    return UserService;
}());
var mysql = new MySQLService();
mysql.save("Dependency Inversion Principle");
var userService = new UserService(mysql);
userService.register("Yash Molawade");
