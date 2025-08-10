const mongoose = require('mongoose')
require('dotenv').config()
const connectTODB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting in DB",error.message)
    }
}

module.exports = connectTODB