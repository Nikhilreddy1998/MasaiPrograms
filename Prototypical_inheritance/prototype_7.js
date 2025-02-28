function Device(name, type, status = 'off') {
    this.name = name;
    this.type = type;
    this.status = status;
  }
  
  Device.prototype.turnOn = function() {
    this.status = 'on';
    console.log(`${this.name} turned on`);
  };
  
  Device.prototype.turnOff = function() {
    this.status = 'off';
    console.log(`${this.name} turned off`);
  };
  
  Device.prototype.checkStatus = function() {
    console.log(`${this.name} status: ${this.status}`);
  };
  
  function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
  }
  
  SmartHome.prototype.addDevice = function(device) {
    this.devices.push(device);
    console.log(`${device.name} added to ${this.owner}'s smart home`);
  };
  
  SmartHome.prototype.removeDevice = function(device) {
    this.devices = this.devices.filter(d => d.name !== device.name);
    console.log(`${device.name} removed from ${this.owner}'s smart home`);
  };
  
  SmartHome.prototype.listDevices = function() {
    console.log(`${this.owner}'s devices:`);
    this.devices.forEach(device => console.log(`- ${device.name} (${device.type})`));
  };
  
  function SmartDevice(name, type, brand, connectivity = 'wifi') {
    Device.call(this, name, type);
    this.brand = brand;
    this.connectivity = connectivity;
  }
  
  SmartDevice.prototype = Object.create(Device.prototype);
  SmartDevice.prototype.constructor = SmartDevice;
  
  SmartDevice.prototype.updateFirmware = async function() {
    console.log(`Updating firmware for ${this.name}...`);
    try {
      const response = await fetch('https://mock-firmware-update-server.com/update');
      if (response.ok) {
        console.log(`${this.name} firmware updated successfully`);
      } else {
        console.error(`Failed to update firmware for ${this.name}`);
      }
    } catch (error) {
      console.error(`Failed to update firmware for ${this.name}`, error);
    }
  };
  
  SmartDevice.prototype.checkConnectivity = function() {
    console.log(`${this.name} connectivity: ${this.connectivity}`);
  };
  
  function SmartLight(name, brand, brightness = 50, color = 'white') {
    SmartDevice.call(this, name, 'light', brand);
    this.brightness = brightness;
    this.color = color;
  }
  
  SmartLight.prototype = Object.create(SmartDevice.prototype);
  SmartLight.prototype.constructor = SmartLight;
  
  SmartLight.prototype.adjustBrightness = function(brightness) {
    this.brightness = brightness;
    console.log(`${this.name} brightness set to ${this.brightness}`);
  };
  
  SmartLight.prototype.setColor = function(color) {
    this.color = color;
    console.log(`${this.name} color set to ${this.color}`);
  };
  
  function SmartThermostat(name, brand, temperature = 20, mode = 'auto') {
    SmartDevice.call(this, name, 'thermostat', brand);
    this.temperature = temperature;
    this.mode = mode;
  }
  
  SmartThermostat.prototype = Object.create(SmartDevice.prototype);
  SmartThermostat.prototype.constructor = SmartThermostat;
  
  SmartThermostat.prototype.setTemperature = function(temperature) {
    this.temperature = temperature;
    console.log(`${this.name} temperature set to ${this.temperature}°C`);
  };
  
  SmartThermostat.prototype.changeMode = function(mode) {
    this.mode = mode;
    console.log(`${this.name} mode set to ${this.mode}`);
  };
  
  function User(username, password) {
    this.username = username;
    this.password = password;
    this.smartHome = null;
  }
  
  User.prototype.authenticate = async function() {
    console.log(`Authenticating user ${this.username}...`);
    try {
      const response = await fetch('https://mock-auth-api.com/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username: this.username, password: this.password })
      });
      if (response.ok) {
        console.log(`User ${this.username} authenticated successfully`);
        return true;
      } else {
        console.error(`Authentication failed for ${this.username}`);
        return false;
      }
    } catch (error) {
      console.error(`Authentication failed for ${this.username}`, error);
      return false;
    }
  };
  
  User.prototype.createSmartHome = function(owner) {
    this.smartHome = new SmartHome(owner);
    console.log(`${owner}'s smart home created`);
  };
  
  User.prototype.addDeviceToSmartHome = function(device) {
    if (this.smartHome) {
      this.smartHome.addDevice(device);
    } else {
      console.log(`User ${this.username} does not have a smart home`);
    }
  };
  
  User.prototype.removeDeviceFromSmartHome = function(device) {
    if (this.smartHome) {
      this.smartHome.removeDevice(device);
    } else {
      console.log(`User ${this.username} does not have a smart home`);
    }
  };
  
  User.prototype.turnOnDevice = function(device) {
    if (this.smartHome && this.smartHome.devices.includes(device)) {
      device.turnOn();
    } else {
      console.log(`Device not found in ${this.username}'s smart home`);
    }
  };
  
  User.prototype.turnOffDevice = function(device) {
    if (this.smartHome && this.smartHome.devices.includes(device)) {
      device.turnOff();
    } else {
      console.log(`Device not found in ${this.username}'s smart home`);
    }
  };
  
  let user1 = new User('john_doe', 'password123');
  let smartLight1 = new SmartLight('Living Room Light', 'Philips');
  let smartThermostat1 = new SmartThermostat('Bedroom Thermostat', 'Nest');
  let smartDevice1 = new SmartDevice('Security Camera', 'Ring', 'wifi');
  
  async function demonstrate() {
    await user1.authenticate();
    user1.createSmartHome('John Doe');
    user1.addDeviceToSmartHome(smartLight1);
    user1.addDeviceToSmartHome(smartThermostat1);
    user1.addDeviceToSmartHome(smartDevice1);
    user1.smartHome.listDevices();
  
    user1.turnOnDevice(smartLight1);
    smartLight1.adjustBrightness(80);
    smartLight1.setColor('blue');
  
    user1.turnOnDevice(smartThermostat1);
    smartThermostat1.setTemperature(22);
    smartThermostat1.changeMode('cool');
  
    user1.turnOnDevice(smartDevice1);
    smartDevice1.checkConnectivity();
    await smartDevice1.updateFirmware();
  }
  
  demonstrate();