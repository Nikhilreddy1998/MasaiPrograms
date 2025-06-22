function info(){

const fs=require('fs')
fs.readFile('data.txt','utf8',(err,data)=>{
    if(err)
    {
        console.error(err)
        return
    }
    return data
})

}

module.exports=info