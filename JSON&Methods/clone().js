
function deepclone(obj){

let jsonstringify=JSON.stringify(obj)
let jsonparse=JSON.parse(jsonstringify)
jsonparse.hobbies.push("coding")
 return jsonparse
}
let obj =
{ name: "Alice", hobbies: ["reading", "traveling"] }
let result=deepclone(obj)
console.log(result)

