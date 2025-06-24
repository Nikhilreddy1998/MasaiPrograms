const { getEmployees, writeEmployees } = require("../modules/employee.modules")

// Route not Found
const notFoundRoute = (req,res)=>res.status(404).json({error:"404 Not Found"})

// Get all emps 
const getAllEmps = (req,res)=>{
    const data = getEmployees()
    const emps = data.emps
    if(emps.length==0)
        return res.status(404).json({error:"Employees list is Empty"})
    res.status(200).json({message:"List of Employees",result:emps})
}

// Add new Employee
const addNewEmp = (req,res)=>{
    let newEmp = req.body
    const data = getEmployees()
    const emps = data.emps
    const id = emps.length>0?emps[emps.length-1].id+1 :1 
    newEmp = {id,...newEmp}
    emps.push(newEmp)
    writeEmployees(data)
    res.status(201).json({message:"New Employee added...",result:emps[emps.length-1]})
}

// Update Employee By id
const updateById = (req,res)=>{
    const id = parseInt(req.params.id)
    let updatedEmp = req.body
    const data = getEmployees()
    const emps = data.emps
    const index = emps.findIndex(emp=>emp.id==id)
    if(index==-1)
        return res.status(404).json({error:`Employee not found with id ${id} to update`})
    emps[index] = {...emps[index],...updatedEmp}
    writeEmployees(data)
    res.status(201).json({message:"Employee get updated...",result:emps[index]})
}

// Delete Employee by id
const deleteById = (req,res)=>{
    const id = parseInt(req.params.id)
    const data = getEmployees()
    const emps = data.emps
    const index = emps.findIndex(emp=>emp.id==id)
    if(index==-1)
        return res.status(404).json({error:`Task not found with id ${id} to delete`})
    const remove = emps[index]
    const filterEmps = emps.filter(emp=>emp.id!=id)
    data.emps = filterEmps
    writeEmployees(data)
    res.status(200).json({message:"Employee Deleted...",result:remove})
}

module.exports = {
    notFoundRoute,
    getAllEmps,
    addNewEmp,
    updateById,
    deleteById
}