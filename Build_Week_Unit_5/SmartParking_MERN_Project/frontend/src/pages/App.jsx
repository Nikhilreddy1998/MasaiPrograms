import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Booking from "./Booking";
import Payment from "./Payment";
import "../App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <nav>
        <div className="nav-left">
          <h3>SmartParking</h3>
        </div>

        <div className="nav-links">
          <Link to="/">🏠 Home</Link>
          <Link to="/login">🔐 Login</Link>
          <Link to="/booking">🅿️ Booking</Link>
          <Link to="/payment">💳 Payment</Link>
        </div>

        <div className="nav-right">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </>
  );
}
