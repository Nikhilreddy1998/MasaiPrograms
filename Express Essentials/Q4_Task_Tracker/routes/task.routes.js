const express = require('express')
const { getAllTasks, filterByTag, addNewTask, updateById, deleteById } = require('../controllers/task.controllers')
const taskRouter = express.Router()

taskRouter.get('/',getAllTasks)

taskRouter.get('/filter',filterByTag)

taskRouter.post('/',addNewTask)

taskRouter.put('/:id',updateById)

taskRouter.delete('/:id',deleteById)

module.exports = taskRouter