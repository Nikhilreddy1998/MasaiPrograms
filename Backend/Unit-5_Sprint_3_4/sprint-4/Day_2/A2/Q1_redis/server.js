const express = require("express");
const { getData, writeData } = require("./models");
const app = express();
const Redis = require("ioredis");
const redis = new Redis();

// body parser
app.use(express.json());

// Get users
app.get("/items", async (req, res) => {
  try {
    let cache = await redis.get("users");
    if (cache) {
      return res
        .status(200)
        .json({ message: "List of users from redis", data: JSON.parse(cache) });
    }
    let data = getData();
    await redis.set("users",JSON.stringify(data.users),"EX",60)
    res.status(200).json({ message: "List of users", data });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add new User
app.post("/items", async(req, res) => {
  try {
    let newUser = req.body;
    let data = getData();
    let users = data.users;
    let id = users.length == 0 ? 1 : users[users.length - 1].id + 1;
    newUser = { id, ...newUser };
    users.push(newUser);
    writeData(data);
    await redis.del('users')
    res.status(201).json({ message: "New user added", newUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update user
app.put("/items/:id", async(req, res) => {
  try {
    let id = parseInt(req.params.id);
    let data = getData();
    let users = data.users;
    let index = users.findIndex((user) => user.id == id);
    if (index == -1) return res.status(404).json({ message: "user not found" });
    users[index] = { ...users[index], ...req.body };
    writeData(data);
    await redis.del('users')
    res.status(200).json({ message: "User found", result: users[index] });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
});

//  Delete User
app.delete("/items/:id", async(req, res) => {
  try {
    let id = parseInt(req.params.id);
    let data = getData();
    let users = data.users;
    let index = users.findIndex((user) => user.id == id);
    if (index == -1) return res.status(404).json({ message: "user not found" });
    users = users.filter((user) => user.id !== id);
    console.log(users);
    data.users = users;
    writeData(data);
    await redis.del('users')
    res.status(200).json({ message: "User deleted", result: users });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
});

// undefined route
app.use((req, res) => res.status(404).json({ error: "404 Not Found" }));

// server listen port
app.listen(3000, () => console.log("Server started at port 3000"));
