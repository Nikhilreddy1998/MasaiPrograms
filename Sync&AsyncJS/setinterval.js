let count = 0
let loading= setInterval(() => {
  console.log("Loading...")
  count++
  if (count == 5) {
    clearInterval(loading)
    console.log("Loaded")
  }
}, 1000)