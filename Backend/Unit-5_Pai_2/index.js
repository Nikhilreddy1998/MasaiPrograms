const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  await Promise.resolve().then(() => console.log("3"));
  console.log("4");
  res.send("Done");
});

app.listen(3000, () => console.log("Server started"));