const fs=require('fs')



function readDataFile(callback) {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading data.txt:", err);
            return callback(err, null);
        }
        callback(null, data);
    });
}


module.exports=readDataFile