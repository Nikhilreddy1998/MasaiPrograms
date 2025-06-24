const fs = require('fs')

const loggerMiddleware = (req,res,next) =>{
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth()+1).padStart(2,"0")
    const day = String(today.getDate()).padStart(2,"0")
    const hours = String(today.getHours()).padStart(2,"0")
    const minutes = String(today.getMinutes()).padStart(2,"0")
    const seconds = String(today.getSeconds()).padStart(2,"0")
    const timeStamp = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`

    const logMsg = `${timeStamp} ${req.method} ${req.originalUrl}\n`
    try {
        fs.appendFileSync('./server.log',logMsg)
    } catch (error) {
         console.error("Failed to write to server.log:", error.message);
    }
    next()
}

module.exports = loggerMiddleware