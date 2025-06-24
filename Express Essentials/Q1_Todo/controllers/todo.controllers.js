const { getData, addOrUpdate } = require("../models/todo.models")


const getAlltodos = (req,res) =>{
    const data = getData().data
    const todos = getData().todos
    res.status(200).json({result:todos})
}

const addTodo = (req,res)=>{
    let newTodo = req.body
    if(!newTodo.title) return res.status(400).json({message:"Title reuired"})
    let data = getData().data
    let todos = data.todos
    const id = todos.length>0 ? todos[todos.length-1].id+1 :1 
    newTodo = {id,...newTodo,complete:false}
    todos.push(newTodo)
    addOrUpdate(data)
    res.status(201).json({message:"New todo added..."})
}

const searchQuery = (req,res)=>{
    const {q} = req.query
    if(!q) return res.status(404),json({message:"Query requied"})
    const data = getData().data
    const todos = data.todos
    const filterTodos = todos.filter(todo=>todo.title.toLowerCase().includes(q.toLowerCase()))
    if(filterTodos.length == 0) return res.status(404).json({message:"Todos not found"})
    res.status(200).json({query:q,result:filterTodos})
}

const updateTodo = (req,res)=>{
    const updateById = parseInt(req.params.id)
    const updateTodo = req.body
    const data = getData().data
    const todos = data.todos
    const index = todos.findIndex(todo=>todo.id==updateById)
    if(index == -1) return res.status(404).json({message:"Todo not found to update"})
    todos[index] = {...todos[index],...updateTodo}
    res.status(201).json({message:'Todo updated',result:todos[index]})
}

const deleteTodo = (req,res)=>{
    const deleteById = parseInt( req.params.id)
    const data = getData().data
    const todos = data.todos
    const index = todos.findIndex(todo=>todo.id==deleteById)
    if(index==-1) return res.status(404).json({message:"Todo not found to Delete"})
    const filterTodos = todos.filter(todo=>todo.id!==deleteById)
    data.todos = filterTodos
    addOrUpdate(data)
    res.status(200).json({message:"Todo deleted successfully"})
}
const notFoundRoute = (req,res)=>{
    res.status(404).json({error:"404 Not Found"})
}

module.exports = {getAlltodos,addTodo,searchQuery,updateTodo,deleteTodo,notFoundRoute}