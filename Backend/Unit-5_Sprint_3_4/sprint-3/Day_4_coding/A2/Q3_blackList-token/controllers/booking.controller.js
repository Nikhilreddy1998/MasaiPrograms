
const BookingModel = require("../models/booking.model");

// Book serice
const bookService =  async (req, res) => {
  try {
    const newBooking = await BookingModel.create({
      ...req.body,
      userId: req.user.id,
    });
    await newBooking.save();
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: err.message });
  }
}

// VIEW own bookings
const selfBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ userId: req.user.id });
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", message: err.message });
  }
}

// update service
const selfBookingUpdate = async (req, res) => {
    try {
      const booking = await BookingModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },req.body,{ new: true });
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json({ message: "Booking updated", booking });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong", message: err.message });
    }
}

// cancel service
const selfBookingDelete = async (req, res) => {
  try {
    const booking = await BookingModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", message: err.message });
  }
}

// ADMIN - View All Bookings
const adminView =  async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('userId', 'name email role');
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", message: err.message });
  }
}

// ADMIN - Approve a Booking
const adminApprove = async (req, res) => {
  try {
    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking approved", booking });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", message: err.message });
  }
}

// ADMIN - Reject a Booking
const adminReject = async (req, res) => {
  try {
    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking rejected", booking });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", message: err.message });
  }
}

// ADMIN - Delete any Booking
const adminDelete =  async (req, res) => {
  try {
    const booking = await BookingModel.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted by admin", booking });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", message: err.message });
  }
}

module.exports = {
    bookService,
    selfBookings,
    selfBookingDelete,
    selfBookingUpdate,
    adminView,
    adminApprove,
    adminDelete,
    adminReject
}