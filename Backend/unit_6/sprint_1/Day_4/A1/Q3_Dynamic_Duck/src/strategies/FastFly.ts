import { FlyStrategy } from "./IFlyStrategy";

export class FastFly implements FlyStrategy{
    fly():void{
        console.log("Flying fast like a rocket!")
    }
}