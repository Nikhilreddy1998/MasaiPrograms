function sortNames(namesArray){
    return namesArray.sort((a,b)=>a.localeCompare(b))
}
let result=sortNames(["Charlie", "Alice", "Bob"])
console.log(result)
