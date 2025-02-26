class Car{
   
 constructor(color,title){
    this.color=color
    this.title=title
}
horn(){
    console.log(`${this.title} is pressing horn`)
}
}
class Engine extends Car{
    constructor(color,title,type){
        super(color,title)
        this.type=type

    }
}
let Engine1=new Engine("Black","Benz","V6")
console.log(Engine1.color)