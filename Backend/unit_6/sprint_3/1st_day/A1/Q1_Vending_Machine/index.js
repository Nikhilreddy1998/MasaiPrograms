var MachineState;
(function (MachineState) {
    MachineState[MachineState["Idle"] = 0] = "Idle";
    MachineState[MachineState["Processing"] = 1] = "Processing";
    MachineState[MachineState["Dispensing"] = 2] = "Dispensing";
})(MachineState || (MachineState = {}));
var VendingMachine = /** @class */ (function () {
    function VendingMachine() {
        this.state = MachineState.Idle;
    }
    VendingMachine.prototype.insertCoin = function () {
        if (this.state === MachineState.Idle) {
            console.log("Coin inserted. Moving to Processing state...");
            this.state = MachineState.Processing;
        }
        else {
            console.log("Coin cannot be inserted right now.");
        }
    };
    VendingMachine.prototype.selectItem = function () {
        if (this.state === MachineState.Processing) {
            console.log("Item selected. Moving to Dispensing state...");
            this.state = MachineState.Dispensing;
        }
        else {
            console.log("You must insert a coin first.");
        }
    };
    VendingMachine.prototype.dispenseItem = function () {
        if (this.state === MachineState.Dispensing) {
            console.log("Dispensing item... Returning to Idle state.");
            this.state = MachineState.Idle;
        }
        else {
            console.log("No item to dispense.");
        }
    };
    return VendingMachine;
}());
var machine = new VendingMachine();
machine.insertCoin();
machine.selectItem();
machine.dispenseItem();
