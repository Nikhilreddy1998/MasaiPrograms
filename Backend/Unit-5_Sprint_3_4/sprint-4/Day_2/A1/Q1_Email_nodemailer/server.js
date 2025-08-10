const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "This is Test Route" });
});

// transporter
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  },
});

// send mail route
app.get("/sendemail", async (req, res) => {
  try {
    const info = await transport.sendMail({
      from: "'Yash Molawade' <yashmolawade06@gmail.com>",
      to: "yashmolawade786@gmail.com,venugopal.burli@masaischool.com",
      subject: "This is first sendmail via Nodemailer",
      text: "This is a testing Mail sent by NEM student, no need to reply."
    });
    res.status(201).json({message:"Email sent successfully",id:info.messageId})
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
});

// undefined route
app.use((req, res) => res.status(404).json({ error: "404 Not Found" }));

// server listen port
app.listen(PORT, () => console.log("Server started at port 3000"));
