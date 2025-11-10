import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";


export default function Home() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/parking").then((res) => setSpaces(res.data));
  }, []);

  return (
    <div>
      <h1>Available Parking Spaces</h1>
      {spaces.length === 0 ? (
        <p>No spaces available</p>
      ) : (
        <ul>
          {spaces.map((s) => (
            <li key={s._id}>
              <strong>{s.location}</strong> — ₹{s.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
