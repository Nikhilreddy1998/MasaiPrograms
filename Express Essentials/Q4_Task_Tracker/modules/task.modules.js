const fs = require('fs')
function getTasks(){
    try {
        const data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
        return data
    } catch (error) {
        console.log("Error",error.message)
    }
}


function writeTasks(data){
    try {
        fs.writeFileSync('./db.json',JSON.stringify(data))
    } catch (error) {
        console.log("Error",error.message)
    }
}

module.exports = {
    getTasks,
    writeTasks,
}