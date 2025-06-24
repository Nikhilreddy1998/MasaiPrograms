const fs = require('fs')

function getData(){
    return JSON.parse(fs.readFileSync('./db.json','utf-8'))
}

function addOrUpdate(data){
    fs.writeFileSync('./db.json',JSON.stringify(data))
}

module.exports = {getData,addOrUpdate}