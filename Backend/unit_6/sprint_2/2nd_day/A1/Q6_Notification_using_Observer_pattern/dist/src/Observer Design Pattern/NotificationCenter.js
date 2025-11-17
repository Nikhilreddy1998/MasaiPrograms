"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCenter = void 0;
class NotificationCenter {
    constructor() {
        this.observerList = [];
    }
    attach(observer) {
        let exits = this.observerList.includes(observer);
        if (exits) {
            console.log(`Observer ${observer.constructor.name} is already subscribed`);
            return;
        }
        this.observerList.push(observer);
        console.log(`Observer added: ${observer.constructor.name}`);
    }
    detach(observer) {
        let index = this.observerList.indexOf(observer);
        if (index == -1) {
            console.log(`Observer ${observer.constructor.name} already unsubscribe`);
            return;
        }
        this.observerList.splice(index, 1);
        console.log(`Observer removed: ${observer.constructor.name}`);
    }
    notify() {
        for (let observer of this.observerList) {
            observer.update();
        }
    }
}
exports.NotificationCenter = NotificationCenter;
