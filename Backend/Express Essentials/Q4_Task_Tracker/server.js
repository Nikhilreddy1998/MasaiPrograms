const express = require('express')
const taskRouter = require('./routes/task.routes')
const { notFoundRoute } = require('./controllers/task.controllers')
const app = express()


app.use(express.json())

// Task Route
app.use('/tasks',taskRouter)

app.use(notFoundRoute)
app.listen(3000,()=>"Server started at https://localhost:3000")