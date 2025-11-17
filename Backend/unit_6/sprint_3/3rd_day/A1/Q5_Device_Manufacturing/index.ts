interface Device {
    specifications(): void;
}

class AppleLaptop implements Device {
    specifications(): void {
        console.log("Apple Laptop: MacBook Pro with M3 chip.");
    }
}

class ApplePhone implements Device {
    specifications(): void {
        console.log("Apple Phone: iPhone 15 Pro Max.");
    }
}

class SamsungLaptop implements Device {
    specifications(): void {
        console.log("Samsung Laptop: Galaxy Book3 Ultra.");
    }
}

class SamsungPhone implements Device {
    specifications(): void {
        console.log("Samsung Phone: Galaxy S24 Ultra.");
    }
}

interface DeviceFactory {
    createDevice(type: string): Device;
}

class AppleFactory implements DeviceFactory {
    createDevice(type: string): Device {
        if (type.toLowerCase() === "laptop") {
            return new AppleLaptop();
        } else if (type.toLowerCase() === "phone") {
            return new ApplePhone();
        }
        throw new Error("Unknown Apple device type");
    }
}

class SamsungFactory implements DeviceFactory {
    createDevice(type: string): Device {
        if (type.toLowerCase() === "laptop") {
            return new SamsungLaptop();
        } else if (type.toLowerCase() === "phone") {
            return new SamsungPhone();
        }
        throw new Error("Unknown Samsung device type");
    }
}

const appleFactory: DeviceFactory = new AppleFactory();
const samsungFactory: DeviceFactory = new SamsungFactory();

const appleLaptop = appleFactory.createDevice("laptop");
const samsungPhone = samsungFactory.createDevice("phone");

appleLaptop.specifications();
samsungPhone.specifications();
