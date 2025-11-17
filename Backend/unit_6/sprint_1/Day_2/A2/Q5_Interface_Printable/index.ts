

interface Printable{
    print():void;
}

class Document1 implements Printable{
    print():void{
        console.log("Printing Document...")
    }
}

class Photo implements Printable{
    print():void{
        console.log("Printing Photo...")
    }
}

const Items:Printable[] = [new Document1(), new Photo()]
Items.forEach((ele)=>ele.print())