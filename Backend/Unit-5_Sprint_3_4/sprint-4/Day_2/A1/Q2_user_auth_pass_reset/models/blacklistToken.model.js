const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token:String
})

const TokenModel = mongoose.model('Token',tokenSchema)

module.exports = TokenModel