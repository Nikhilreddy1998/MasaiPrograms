var x=1
a()
b()
console.log(x)
function a(){
    var x=10
    console.log(x)
}
function b(){
    var x=100
    console.log(x)
}
/*
variable declarations are created in memory 
during the execution context creation phase
first memory phase and next code
everything happen in call stack after each completion it check GEC
global execution context till all completion
*/

// first memory is allocated from starting then code from starting

function b(){
console.log(a)
}
var a=20
b()

/* Lexical Environment means heirarchy
Whenever an erxecution context is created 
a lexical environment is created

in below example c function is sitting in l function
**** Lexical environment ---> Local memory + lexical environment of parent 
like that it continues till GEC 
*/

function l(b){
    c()
    function c(){
        console.log(b)
    }
}
l(42)

//example
function outerFn(){
    console.log(a)
    var a=10
    function innerfunction(){
        console.log(a)
        var a=20
        console.log(a)
    }
    innerfunction()
    console.log(a)
}
outerFn()