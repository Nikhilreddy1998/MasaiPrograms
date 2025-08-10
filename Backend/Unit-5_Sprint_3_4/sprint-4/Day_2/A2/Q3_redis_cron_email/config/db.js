const mongoose = require('mongoose')
require('dotenv').config()

const connecToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting in db")
        console.log(error)
    }
}

module.exports = connecToDB