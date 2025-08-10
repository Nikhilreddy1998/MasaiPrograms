const mongoose = require("mongoose")
const express = require("express")
const http = require("http")
const cors = require("cors");
const cron = require("node-cron");
const { Server } = require("socket.io");
const Redis = require("ioredis")
const redis = new Redis()

/// connection to DB, Schema & Models
mongoose.connect("mongodb://127.0.0.1:27017/simplechatapp");

/// chat Schema
let chatSchema = new mongoose.Schema({
  from: String,
  message: String,
  timeStamp: Date,
})

let ChatModel = mongoose.model("Chat", chatSchema);


const app = express()
const server = http.createServer(app)
app.use(cors())


const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

let userDetails = {}

io.on("connection", (client) => {
  console.log("client connected", client.id)

  client.on("registerUser", async (userName) => {
    userDetails[client.id] = userName
    let chatHistoryJSON = await redis.lrange("AllChatsToUI", 0, -1)
    let chatHistoryArray = chatHistoryJSON.map(JSON.parse)
    //console.log(chatHistoryArray)
    io.emit("chat_History", chatHistoryArray)
  })

  client.on("sendMessage", async (message) => {
    client.emit("response", "Thanks for chatting")
    let chatObj = {
      from: userDetails[client.id],
      message: message,
      timeStamp: new Date(),
    };

    await redis.rpush("AllChatsToUI", JSON.stringify(chatObj))
    await redis.rpush("NewChatsToDB", JSON.stringify(chatObj))
    let chatHistoryJSON = await redis.lrange("AllChatsToUI", 0, -1)
    let chatHistoryArray = chatHistoryJSON.map(JSON.parse)
    io.emit("chat_History", chatHistoryArray)
  });
});


cron.schedule("*/30 * * * * *", async () => {
  console.log("Cron Started")
  let chatHistoryJSON = await redis.lrange("NewChatsToDB", 0, -1)
  if (chatHistoryJSON.length == 0) {
    console.log("No New Chats To Push Into DB")
  } else {
    let chatHistoryArray = chatHistoryJSON.map(JSON.parse)
    await ChatModel.insertMany(chatHistoryArray);
    await redis.del("NewChatsToDB");
    await redis.del("AllChatsToUI");
    let recentOlderChats = await ChatModel.find().sort({timeStamp:-1}).limit(15)
    recentOlderChats =  recentOlderChats.reverse()
    for(chat of recentOlderChats){
          await redis.rpush("AllChatsToUI", JSON.stringify(chat))
    }
    console.log("Chats Pushed Into DB & Also Cleared From Redis")
  }
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})
