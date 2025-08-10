const fs = require('fs')

const getData = () =>{
    try {
        let data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
        return data
    } catch (error) {
        console.log(error.message)
    }
}

const writeData = (data) =>{
    try {
        fs.writeFileSync('./db.json',JSON.stringify(data))
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getData,
    writeData
}