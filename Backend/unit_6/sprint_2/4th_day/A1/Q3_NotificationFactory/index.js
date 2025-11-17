var EmailNotification = /** @class */ (function () {
    function EmailNotification() {
    }
    EmailNotification.prototype.send = function (message) {
        console.log("Sending EMAIL: ".concat(message));
    };
    return EmailNotification;
}());
var SMSNotification = /** @class */ (function () {
    function SMSNotification() {
    }
    SMSNotification.prototype.send = function (message) {
        console.log("Sending SMS: ".concat(message));
    };
    return SMSNotification;
}());
var PushNotification = /** @class */ (function () {
    function PushNotification() {
    }
    PushNotification.prototype.send = function (message) {
        console.log("Sending PUSH: ".concat(message));
    };
    return PushNotification;
}());
var NotificationFactory = /** @class */ (function () {
    function NotificationFactory() {
    }
    NotificationFactory.createNotification = function (type) {
        if (type === "Email")
            return new EmailNotification();
        if (type === "SMS")
            return new SMSNotification();
        if (type === "Push")
            return new PushNotification();
        throw new Error("Invalid notification type");
    };
    return NotificationFactory;
}());
var notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!");
var smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456");
