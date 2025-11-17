
//  High-level modules should not depend on Low-level modules
// Both should be depende on abstraction

interface Database{
    save(data:string):void;
}

class MySQLService implements Database{
    save(data:string):void{
        console.log("Saving to SQL:",data)
    }
}

class UserService{
    private db:Database
    constructor(db:Database){
        this.db = db
    }

    register(user:string):void{
        this.db.save(user)
        console.log("User Registered")
    }
}

const mysql = new MySQLService()
mysql.save("Dependency Inversion Principle")

const userService = new UserService(mysql)
userService.register("Yash Molawade")