const fs = require('fs')
const getData = () =>{
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
    const todos = data.todos
    return {data,todos}
}

const addOrUpdate = (data) =>{
    fs.writeFileSync('./db.json',JSON.stringify(data))
}

module.exports = {getData,addOrUpdate}