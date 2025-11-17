import IObserver from "./IObserver";


export class NotificationCenter{
    private observerList:IObserver[] = []
    
    attach(observer:IObserver):void{
        let exits = this.observerList.includes(observer)
        if(exits){
            console.log(`Observer ${observer.constructor.name} is already subscribed`)
            return
        }
        this.observerList.push(observer)
        console.log(`Observer added: ${observer.constructor.name}`)
    }

    detach(observer:IObserver):void{
        let index = this.observerList.indexOf(observer)
        if(index==-1){
            console.log(`Observer ${observer.constructor.name} already unsubscribe`)
            return
        }
        this.observerList.splice(index,1)
        console.log(`Observer removed: ${observer.constructor.name}`)
    }

    notify():void{
        for(let observer of this.observerList){
            observer.update()
        }
    }
}