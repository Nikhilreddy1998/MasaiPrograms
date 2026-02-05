let calculator ={
    a:1,
    b:2,
    add:function(a,b){
        let value1=a?a:this.a
        let value2=b?b:this.b
        return value1+value2
    }
}
console.log(calculator.add())
console.log(calculator.add(12))
console.log(calculator.add(1,3))

//its not about remembering its about knowing where we have to use what