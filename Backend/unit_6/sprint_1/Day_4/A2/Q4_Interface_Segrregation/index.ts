// Class should not be forced to implements methods its doesn't need

interface Printable {
  print(): void;
}

interface Scannable {
  scan(): void;
}

interface Faxable {
  fax(): void;
}

class OldPrinter implements Printable {
  print(): void {
    console.log("OldPrinter is printing....");
  }
}

class SmartPrinter implements Printable, Scannable, Faxable {
  print(): void {
    console.log("SmartPrinter is printing...");
  }

  scan(): void {
    console.log("SmartPrinter is scanning...");
  }

  fax(): void {
    console.log("SmartPrinter is sending a fax...");
  }
}

// This will only prints
const oldPrinter = new OldPrinter()
oldPrinter.print()

// This will print, scan & use for sending fax
const smartPrinter = new SmartPrinter()
smartPrinter.fax()
smartPrinter.scan()
smartPrinter.print()