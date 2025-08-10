const BookingModel = require("../models/booking.model");

// Get total bookings and total seats booked per movie
const movieBookings =  async (req, res) => {
  try {
    let booking = await BookingModel.aggregate([
      {
        $group: {
          _id: "$movieId",
          totalBooking: { $sum: 1 },
          totalSeats: { $sum: "$seats" },
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $project: {
          _id: 0,
          movieName: "$movie.title",
          totalBooking: 1,
          totalSeats: 1,
        },
      },
      { $sort: { movieName: 1 } },
    ]);
    res.status(200).json({ details: booking });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
}

// Get booking history for each user with movie titles
const userBookings =  async (req, res) => {
  try {
    let booking = await BookingModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      { $group: { _id: "$userId", name: { $first: "$user.name" },booking:{
        $push:{
            movieName:"$movie.title",
            seats:"$seats",
            status:"$status"
        }
    } } },
    ]);
    res.status(200).json({ details: booking });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
}

// Find users who booked more than 2 times
const topUsers = async (req, res) => {
  try {
    let booking = await BookingModel.aggregate([
      {$group:{
        _id:"$userId",
        countBookings:{$sum:1}
      }},
      {$match:{countBookings:{$gt:2}}},
      {$lookup:{
        from:"users",
        localField:"_id",
        foreignField:"_id",
        as:"user"
      }},
      {$unwind:"$user"},
      {$project:{
        _id:0,
        userName:"$user.name",
        countBookings:1
      }}
    ]);
    res.status(200).json({ details: booking });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
}

// Total seats booked per genre
const genreBookings = async (req, res) => {
  try {
    let booking = await BookingModel.aggregate([
      {$lookup:{
        from:"movies",
        localField:"movieId",
        foreignField:"_id",
        as:"movie"
      }},
      {$unwind:"$movie"},
      {$group:{
        _id: {
        genre: "$movie.genre",
        title: "$movie.title"
      },
        countSeats:{$sum:"$seats"}
      }},
      {$project:{
        genre:"$_id.genre",
        movieName:"$_id.title",
        countSeats:1,
        _id:0
    
      }}
    ]);
    res.status(200).json({ details: booking });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
}

//  Get all current active ("Booked") bookings with movie and user details
const activeBookings = async (req, res) => {
  try {
    let booking = await BookingModel.aggregate([
        {$match:{status:"Booked"}},
        {$lookup:{
            from:'users',
            localField:"userId",
            foreignField:"_id",
            as:"user"
        }},
        {$unwind:"$user"},
        {$lookup:{
            from:'movies',
            localField:"movieId",
            foreignField:"_id",
            as:"movie"
        }},
        {$unwind:"$movie"},
        {$project:{
            _id:0,
            status:1,
            userName:"$user.name",
            userEmail:"$user.email",
            movieTitle:"$movie.title",
            movieGenre:"$movie.genre"
        }}
    ])
     res.status(200).json({ details: booking });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
}

module.exports = {
    movieBookings,
    userBookings,
    topUsers,
    genreBookings,
    activeBookings
}