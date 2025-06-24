const express = require('express')
const ticketRouter = require('./routes/ticket.routes')
const { notFoundRoute } = require('./controller/ticket.controllers')

const app = express()
app.use(express.json())

// ticket routes
app.use('/tickets',ticketRouter)
app.get('/tickets',ticketRouter)
app.post('/tickets',ticketRouter)
app.put('/tickets',ticketRouter)
app.delete('/tickets',ticketRouter)
app.patch('/tickets',ticketRouter)

app.use(notFoundRoute)

app.listen(3000,()=>console.log("Server started at https://localhost:3000"))