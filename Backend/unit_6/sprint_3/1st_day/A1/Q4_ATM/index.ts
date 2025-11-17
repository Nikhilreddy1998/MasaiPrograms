

enum ATMState {
  Idle,
  CardInserted,
  Authenticated,
  DispensingCash
}

class ATM {
  private state: ATMState;

  constructor() {
    this.state = ATMState.Idle;
  }

  insertCard() {
    if (this.state === ATMState.Idle) {
      console.log("Card inserted. Please enter your PIN.");
      this.state = ATMState.CardInserted;
    } else {
      console.log("Cannot insert card right now.");
    }
  }

  enterPin(correct: boolean) {
    if (this.state === ATMState.CardInserted) {
      if (correct) {
        console.log("PIN correct. You can withdraw cash.");
        this.state = ATMState.Authenticated;
      } else {
        console.log("Wrong PIN. Returning to Idle state.");
        this.state = ATMState.Idle;
      }
    } else {
      console.log("No card inserted.");
    }
  }

  withdrawCash() {
    if (this.state === ATMState.Authenticated) {
      console.log("Dispensing cash...");
      this.state = ATMState.DispensingCash;
      this.finishTransaction();
    } else {
      console.log("You must authenticate first.");
    }
  }

  private finishTransaction() {
    console.log("Transaction complete. Returning to Idle state.");
    this.state = ATMState.Idle;
  }
}

const atm = new ATM();
atm.insertCard();
atm.enterPin(true);
atm.withdrawCash();
