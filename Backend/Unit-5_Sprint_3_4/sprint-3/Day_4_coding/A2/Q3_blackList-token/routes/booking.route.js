const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { bookService, selfBookings, selfBookingDelete, adminView, adminApprove, adminReject, adminDelete, selfBookingUpdate } = require("../controllers/booking.controller");
const bookingRouter = express.Router();
require("dotenv").config();

// Book serice
bookingRouter.post("/", authMiddleware(["user"]), bookService);

// VIEW own bookings
bookingRouter.get("/", authMiddleware(["user"]),selfBookings);

// update service
bookingRouter.patch("/:id",authMiddleware(["user"]),selfBookingUpdate);

// cancel service
bookingRouter.delete('/:id', authMiddleware(['user']), selfBookingDelete);

// ADMIN - View All Bookings
bookingRouter.get('/admin', authMiddleware(['admin']), adminView);

// ADMIN - Approve a Booking
bookingRouter.patch('/admin/approve/:id', authMiddleware(['admin']),adminApprove);

// ADMIN - Reject a Booking
bookingRouter.patch('/admin/reject/:id', authMiddleware(['admin']), adminReject);

// ADMIN - Delete any Booking
bookingRouter.delete('/admin/delete/:id', authMiddleware(['admin']),adminDelete);

module.exports = bookingRouter;
