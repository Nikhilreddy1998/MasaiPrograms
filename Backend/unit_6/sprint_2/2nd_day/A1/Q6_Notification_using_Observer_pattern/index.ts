import { NotificationCenter } from "./src/Observer Design Pattern/NotificationCenter";
import { SmartPhoneObserver } from "./src/Observer Design Pattern/SmartPhoneObserver";
import { TabletObserver } from "./src/Observer Design Pattern/TabletObserver";


const realmePhone = new SmartPhoneObserver()
const realmeTablet = new TabletObserver()

const notificationCenter = new NotificationCenter()

notificationCenter.attach(realmePhone)
notificationCenter.attach(realmeTablet)
notificationCenter.detach(realmeTablet)
notificationCenter.notify()