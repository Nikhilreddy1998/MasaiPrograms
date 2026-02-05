
// Destructuring array
var arr=[1,2,3,4]
var [first,second,third]=arr
console.log(first,second,third)

//Destructuring object
var obj={a:1,b:2,c:3}
var{a,b,c}=obj
console.log(a,b,c)

var person ={
    name:"Nikhil",
    age:"27"
}
var{name,age}=person
console.log(`My name is ${name} and i am ${age} years of age`)

// Renaming while object destructuring
var person1 ={
    name1:"Nikhil",
    age1:"27"
}
var{name1:ceo,age1:ageis}=person1
console.log(`My name is ${ceo} and i am ${ageis} years of age`)
console.log(ceo,ageis)

//destructuring multilevel array

var arr3=[1,[3,4],5,6]
var [first,[third,fourth],fifth,sixth]=arr3
console.log(first,third,fourth,fifth,sixth)

//destructuring multilevel object most important *******
//example 1
var info={
    details:{
        personDetails:{
            name:"Nikhil",
            age:"27"
        }

    }
}

var{details:{personDetails:{name,age}}}=info

console.log(name,age)

//example 2

var user={
    person1:{
        details:{
            name:"sanjay",
            moreDetails:{
                age:"29",
                isMarried:"Not married"
            }
        }

    },
    person2:{
        details:{
            name:"venkatesh",
            moreDetails:{
                age:"27",
                isMarried:"married"
            }
        }

    }
}

var {person1:{details:{moreDetails:{age,isMarried}}}}=user

console.log(age,isMarried)


