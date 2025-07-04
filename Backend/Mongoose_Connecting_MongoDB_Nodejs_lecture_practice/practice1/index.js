const mongoose = require("mongoose") // imported

// establish a connection with MongoDB

const connectToDB= async()=>{

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/backendtest')
        console.log("connected to DB")
    }
    catch(err){
     console.log("Error in connecting DB")
     console.log(err)          
    }

}

connectToDB()


const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    loaction:String,
    isMarried:Boolean
})

const UserModel = mongoose.model("User",userSchema)


UserModel.create({
    name:'Nikhil',
    age:26,
    location:'Hyderabad',
    isMarried:false
}).then(
    ()=>{
        console.log("Data added in Database under collection in user in Database backend")
    }
)


let newUser= new UserModel({
    name:"Bob",
    age:"24",
    location:"Bombay",
    isMarried:false
})

newUser.save()
.then(()=>{
    console.log("Data added")
})
.catch((err)=>{
    console.log("Error in loading", err)
})


let users = UserModel.find()

users.then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log("err in getting data")
})


let updatedUser= UserModel.findByIdAndUpdate('6866d9c5423254401af6e4e9',{name:"Vivek"})

updatedUser.then(()=>{
    console.log("user updated")
}).catch((err)=>{
    console.log("error while updating")
})