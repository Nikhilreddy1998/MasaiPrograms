const express = require('express')
const { getAllEmps, updateById, deleteById, addNewEmp } = require('../controllers/employee.controllers')
const roleCheck = require('../middlewares/roleCheckMiddleware')

const empRouter = express.Router()

empRouter.get('/',roleCheck(['admin','hr']),getAllEmps)

empRouter.post('/',roleCheck(['admin']),addNewEmp)

empRouter.put('/:id',roleCheck(['admin','hr']),updateById)

empRouter.delete('/:id',roleCheck(['admin']),deleteById)



module.exports = empRouter