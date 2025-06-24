const express = require('express')
const app = express()

const todoRouter = require('./routes/todo.routes')
const { notFoundRoute } = require('./controllers/todo.controllers')

app.use(express.json())

// todo Route
app.use('/todos',todoRouter)
app.get('/todos',todoRouter)
app.post('/todos',todoRouter)
app.put('/todos',todoRouter)
app.delete('/todos',todoRouter)


app.use(notFoundRoute)
app.listen(3000,()=>console.log("Server started at https://localhost:3000"))
