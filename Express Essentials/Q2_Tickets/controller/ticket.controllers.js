const { getData, addOrUpdate } = require("../modules/ticket.modules");

const notFoundRoute = (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
};

const getAllTickets = (req, res) => {
  const data = getData();
  const tickets = data.tickets;
  if (tickets.length == 0)
    return res.status(404).json({ message: "tickets not found" });
  res.status(200).json({ message: "List of tickets", result: tickets });
};

const findTicketById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = getData();
  const tickets = data.tickets;
  const index = tickets.findIndex((ticket) => ticket.id == id);
  if (index == -1) return res.status(404).json({ message: "Ticket Not Found" });
  res.status(200).json({ message: "Ticket Found", result: tickets[index] });
};

const addNewTicket = (req, res) => {
  let newTicket = req.body;
  const data = getData();
  const tickets = data.tickets;
  const id = tickets.length == 0 ? 1 : tickets[tickets.length - 1].id + 1;
  newTicket = { id, ...newTicket, status: "pending" };
  tickets.push(newTicket);
  console.log(data);
  addOrUpdate(data);
  res.status(201).json({
    message: "New Ticket added...",
    result: tickets[tickets.length - 1],
  });
};

const updateTicketById = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTicket = req.body;
  const data = getData();
  const tickets = data.tickets;
  const index = tickets.findIndex((ticket) => ticket.id == id);
  if (index == -1)
    return res.status(404).json({ message: "Ticket not found to update" });
  tickets[index] = { id, ...tickets[index], ...updatedTicket };
  addOrUpdate(data);
  res.status(201).json({ message: "Ticket updated", result: tickets[index] });
};

const deleteTicketById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = getData();
  const tickets = data.tickets;
  const index = tickets.findIndex((ticket) => ticket.id == id);
  if (index == -1)
    return res.status(404).json({ message: "Ticket not found to delete" });
  const filterTickets = tickets.filter((ticket) => ticket.id !== id);
  data.tickets = filterTickets;
  addOrUpdate(data);
  res.status(200).json({ message: "Ticket delete" });
};

const resolveTicketById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = getData();
  const tickets = data.tickets;
  const index = tickets.findIndex((ticket) => ticket.id == id);
  if (index == -1)
    return res.status(404).json({ message: "Ticket not found to resolve" });
  tickets[index] = {...tickets[index],status:"resolved"}
  addOrUpdate(data)
  res.status(201).json({ message: "Ticket Resolved",result:tickets[index] });
};

module.exports = {
  notFoundRoute,
  getAllTickets,
  findTicketById,
  addNewTicket,
  updateTicketById,
  deleteTicketById,
  resolveTicketById
};
