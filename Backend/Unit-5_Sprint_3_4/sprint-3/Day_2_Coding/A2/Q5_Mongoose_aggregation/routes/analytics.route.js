const express = require("express");
const { movieBookings, userBookings, topUsers, genreBookings, activeBookings } = require("../controllers/analytics.controller");
const analysisRouter = express.Router();

// Get total bookings and total seats booked per movie
analysisRouter.get("/movie-bookings",movieBookings);

// Get booking history for each user with movie titles
analysisRouter.get("/user-bookings", userBookings);

// Find users who booked more than 2 times
analysisRouter.get("/top-users",topUsers);

// Total seats booked per genre
analysisRouter.get("/genre-wise-bookings", genreBookings);

//  Get all current active ("Booked") bookings with movie and user details
analysisRouter.get("/active-bookings",activeBookings);

module.exports = analysisRouter;
