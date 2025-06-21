function getSystemInfo(){
    const os=require('os')
    console.log("system information")
    console.log("------------------------")
    console.log(`CPU Architecture: ${os.arch()}`)
    console.log(`OS Platform: ${os.platform()}`)
    console.log(`OS Release: ${os.release()}`)
    console.log(`Hostname: ${os.hostname()}`)
    console.log(`os Type: ${os.type()} `)
    console.log(`cpu model:${os.cpus()[0].model}`)
    console.log(`cpu speed:${os.cpus()[0].speed}`)
    console.log(`cpu cores:${os.cpus().length}`)
    console.log(`Free memory:${os.freemem()} `)
    console.log(`total memory:${os.totalmem()} `)

}

module.exports=getSystemInfo