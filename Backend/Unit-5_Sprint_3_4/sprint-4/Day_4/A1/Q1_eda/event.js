const EventEmitter = require("events")
const event = new EventEmitter()

event.on("userLoggedIn", (user) => {
  console.log(`User ${user} logged in`)
});

event.on("messageReceived", (user) => {
  console.log(`Notification sent to ${user}`)
});

event.on("dataSynced", () => {
  console.log("Data sync complete")
});


function call(user) {
  setTimeout(() => {
    event.emit("userLoggedIn", user)
    setTimeout(() => {
      event.emit("messageReceived", user)
      console.log("Syncing user data...")
      setTimeout(() => {
        event.emit("dataSynced")
      }, 2000)
    }, 2000)
  }, 2000)
}

call("Yash")
