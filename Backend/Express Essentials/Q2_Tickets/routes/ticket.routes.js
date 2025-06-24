const express = require('express')
const { getData, addOrUpdate } = require('../modules/ticket.modules')
const { getAllTickets,findTicketById, addNewTicket, updateTicketById, deleteTicketById, resolveTicketById  } = require('../controller/ticket.controllers')
const { dataCheck } = require('../middlewares/dataCheckMiddleware')
const ticketRouter = express.Router()

ticketRouter.get('/',getAllTickets)

ticketRouter.get('/:id',findTicketById)

ticketRouter.post('/',dataCheck,addNewTicket)

ticketRouter.put('/:id',updateTicketById)

ticketRouter.delete('/:id',deleteTicketById)

ticketRouter.patch('/:id/resolve',resolveTicketById)



module.exports  = ticketRouter