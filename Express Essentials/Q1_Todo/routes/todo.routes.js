const express = require('express')
const { getAlltodos, addTodo, searchQuery, updateTodo, deleteTodo } = require('../controllers/todo.controllers')
const { getData, addOrUpdate } = require('../models/todo.models')
const todoRouter = express.Router()

todoRouter.get('/',getAlltodos)
todoRouter.post('/',addTodo)
todoRouter.get('/search',searchQuery)
todoRouter.put('/:id',updateTodo)
todoRouter.delete('/:id',deleteTodo)

module.exports = todoRouter
