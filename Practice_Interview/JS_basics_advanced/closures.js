/*
A closure is the combination of a function bundle together(enclosed)
with references to its surrounding state(lexical environmnet)
In other words a closure gives you access to an outer functions scope
from an innerfunction
*/

// function outer(){
//     let a=20
//     function inner(){
//         console.log(a)
//     }
//     inner()
// }
// outer()


// counter example
function counter(){
    var count=0
    return function inc(){
        count++
        return count
    }
}
let inc=counter()
console.log(inc())
