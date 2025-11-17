import { FlyStrategy } from "./IFlyStrategy";

export class NoFly implements FlyStrategy{
    fly():void{
        console.log("I cannot fly")
    }
}