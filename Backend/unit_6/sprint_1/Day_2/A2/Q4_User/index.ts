

class User{
    protected username:string
    constructor(username:string){
        this.username = username
    }
}

class Admin extends User{
    constructor(username:string){
        super(username)
    }
    showUsername():void{
        console.log(`Username : ${this.username}`)
    }
}

const admin1 = new Admin("Yash")
admin1.showUsername()