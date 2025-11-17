import IObserver from "./IObserver";



export class TabletObserver implements IObserver{
    update(): void {
        console.log("Tablet received notification")
    }
}