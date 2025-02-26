function createEmployee(name,role,salary){
    let obj={}
    obj.name=name
    obj.role=role
    obj.salary=salary
    obj.introduce=function(){
      console.log(`${this.name} ${this.salary}`)
    }
    return obj
  }
  let employee1=createEmployee("Nikhil","SDE-3",100000)
  employee1.introduce()
  
  