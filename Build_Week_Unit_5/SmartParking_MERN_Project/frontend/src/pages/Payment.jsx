import React, { useState } from "react";
import axios from "axios";
import "../App.css";


export default function Payment() {
  const [userId, setUserId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");

  const pay = async () => {
    try {
      await axios.post("http://localhost:5000/api/payments/pay", {
        userId,
        bookingId,
        amount,
      });
      alert("Mock payment successful!");
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div>
      <h2>Mock Payment Page</h2>
      <input placeholder="User ID" onChange={(e) => setUserId(e.target.value)} /><br />
      <input placeholder="Booking ID" onChange={(e) => setBookingId(e.target.value)} /><br />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} /><br />
      <button onClick={pay}>Pay</button>
    </div>
  );
}
