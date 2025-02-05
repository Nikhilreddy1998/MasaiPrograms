function printAnswer(obj) {
    if (obj.role ==
        'Admin' || 'User'
    ) {
        if (obj.active) {
            console.log(`${obj.role} Access Granted!`)
        }
        else {
            console.log(`${obj.role} Access Revoked`)
        }
    }
    else
    {
        console.log("Access Denied")
    }
}





let user = { name: "Alice", role: "Admin", active: false };
let user1 = { name: "Bob", role: "User", active: true };
let user2= { name: "John", role: "Cashier", active: false };

printAnswer(user)
printAnswer(user1)
printAnswer(user2)