import IObserver from "./IObserver";


export class SmartPhoneObserver implements IObserver{
    update(): void {
        console.log('Smartphone received notification')
    }
}