const mongoose = require('mongoose')
require('dotenv').config()

const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting to DB")
        console.log(error.message)
    }
}

module.exports = connectToDB