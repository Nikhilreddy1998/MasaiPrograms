import React, { useState } from "react";
import axios from "axios";
import "../App.css";


export default function Booking() {
  const [userId, setUserId] = useState("");
  const [parkingSpaceId, setSpace] = useState("");
  const [date, setDate] = useState("");

  const book = async () => {
    try {
      await axios.post("http://localhost:5000/api/bookings/book", {
        userId,
        parkingSpaceId,
        date,
        status: "confirmed",
      });
      alert("Booking successful!");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Book a Parking Space</h2>
      <input placeholder="User ID" onChange={(e) => setUserId(e.target.value)} /><br />
      <input placeholder="Parking Space ID" onChange={(e) => setSpace(e.target.value)} /><br />
      <input type="date" onChange={(e) => setDate(e.target.value)} /><br />
      <button onClick={book}>Book</button>
    </div>
  );
}
