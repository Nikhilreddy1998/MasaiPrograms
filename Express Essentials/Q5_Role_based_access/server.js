const express = require('express')
const { notFoundRoute } = require('./controllers/employee.controllers')
const empRouter = require('./routes/employee.routes')
const loggerMiddleware = require('./middlewares/loggerMiddleware')
const app = express()

app.use(express.json())

// Logger Middleware
app.use(loggerMiddleware)

// employee Route
app.use('/employees',empRouter)

app.use(notFoundRoute)
app.listen(3000,()=>"Server started at https://localhost:3000")