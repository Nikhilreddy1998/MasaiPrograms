enum MachineState {
  Idle,
  Processing,
  Dispensing
}

class VendingMachine {
  private state: MachineState;

  constructor() {
    this.state = MachineState.Idle;
  }

  insertCoin() {
    if (this.state === MachineState.Idle) {
      console.log("Coin inserted. Moving to Processing state...");
      this.state = MachineState.Processing;
    } else {
      console.log("Coin cannot be inserted right now.");
    }
  }

  selectItem() {
    if (this.state === MachineState.Processing) {
      console.log("Item selected. Moving to Dispensing state...");
      this.state = MachineState.Dispensing;
    } else {
      console.log("You must insert a coin first.");
    }
  }

  dispenseItem() {
    if (this.state === MachineState.Dispensing) {
      console.log("Dispensing item... Returning to Idle state.");
      this.state = MachineState.Idle;
    } else {
      console.log("No item to dispense.");
    }
  }
}

const machine = new VendingMachine();
machine.insertCoin();
machine.selectItem();
machine.dispenseItem();
