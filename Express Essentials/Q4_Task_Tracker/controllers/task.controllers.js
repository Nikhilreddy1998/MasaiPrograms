const { getTasks, writeTasks } = require('../modules/task.modules')

// Route not Found
const notFoundRoute = (req,res)=>res.status(404).json({error:"404 Not Found"})

// Get all Tasks 
const getAllTasks = (req,res)=>{
    const data = getTasks()
    const tasks = data.tasks
    if(tasks.length==0)
        return res.status(404).json({error:"Tasks list is Empty"})
    res.status(200).json({message:"List of Tasks",result:tasks})
}

// Filter tasks by tag
const filterByTag = (req,res)=>{
    const {tag} = req.query
    const data = getTasks()
    const tasks = data.tasks
    const filterTasks = tasks.filter(task=>task.tag.toLowerCase().includes(tag.toLowerCase()))
    if(filterTasks.length==0)
        return res.status(404).json({error:`Task not found with tag ${tag}`})
    res.status(200).json({message:`Task found with tag ${tag}`,results:filterTasks})  
}

// Add new Task
const addNewTask = (req,res)=>{
    let newTask = req.body
    const data = getTasks()
    const tasks = data.tasks
    const id = tasks.length>0?tasks[tasks.length-1].id+1 :1 
    newTask = {id,...newTask}
    tasks.push(newTask)
    writeTasks(data)
    res.status(201).json({message:"New Task added...",result:tasks[tasks.length-1]})
}

// Update Task By id
const updateById = (req,res)=>{
    const id = parseInt(req.params.id)
    let updatedTask = req.body
    const data = getTasks()
    const tasks = data.tasks
    const index = tasks.findIndex(task=>task.id==id)
    if(index==-1)
        return res.status(404).json({error:`Task not found with id ${id} to update`})
    tasks[index] = {...tasks[index],...updatedTask}
    writeTasks(data)
    res.status(201).json({message:"Task get updated...",result:tasks[index]})
}

// Delete task by id
const deleteById = (req,res)=>{
    const id = parseInt(req.params.id)
    const data = getTasks()
    const tasks = data.tasks
    const index = tasks.findIndex(task=>task.id==id)
    if(index==-1)
        return res.status(404).json({error:`Task not found with id ${id} to delete`})
    const remove = tasks[index]
    const filterTasks = tasks.filter(task=>task.id!=id)
    data.tasks = filterTasks
    writeTasks(data)
    res.status(200).json({message:"Task Deleted...",result:remove})
}




module.exports = {
    notFoundRoute,
    getAllTasks,
    filterByTag,
    addNewTask,
    updateById,
    deleteById
}