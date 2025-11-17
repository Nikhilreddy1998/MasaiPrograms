var ATMState;
(function (ATMState) {
    ATMState[ATMState["Idle"] = 0] = "Idle";
    ATMState[ATMState["CardInserted"] = 1] = "CardInserted";
    ATMState[ATMState["Authenticated"] = 2] = "Authenticated";
    ATMState[ATMState["DispensingCash"] = 3] = "DispensingCash";
})(ATMState || (ATMState = {}));
var ATM = /** @class */ (function () {
    function ATM() {
        this.state = ATMState.Idle;
    }
    ATM.prototype.insertCard = function () {
        if (this.state === ATMState.Idle) {
            console.log("Card inserted. Please enter your PIN.");
            this.state = ATMState.CardInserted;
        }
        else {
            console.log("Cannot insert card right now.");
        }
    };
    ATM.prototype.enterPin = function (correct) {
        if (this.state === ATMState.CardInserted) {
            if (correct) {
                console.log("PIN correct. You can withdraw cash.");
                this.state = ATMState.Authenticated;
            }
            else {
                console.log("Wrong PIN. Returning to Idle state.");
                this.state = ATMState.Idle;
            }
        }
        else {
            console.log("No card inserted.");
        }
    };
    ATM.prototype.withdrawCash = function () {
        if (this.state === ATMState.Authenticated) {
            console.log("Dispensing cash...");
            this.state = ATMState.DispensingCash;
            this.finishTransaction();
        }
        else {
            console.log("You must authenticate first.");
        }
    };
    ATM.prototype.finishTransaction = function () {
        console.log("Transaction complete. Returning to Idle state.");
        this.state = ATMState.Idle;
    };
    return ATM;
}());
var atm = new ATM();
atm.insertCard();
atm.enterPin(true);
atm.withdrawCash();
