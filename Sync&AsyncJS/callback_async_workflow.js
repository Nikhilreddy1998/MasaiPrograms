let counter = 0

function simulateAsync(taskName, callback) {
  setTimeout(() => {
    counter++
    const success = counter % 10 !== 0
    if (success) {
      console.log(`${taskName} done`)
      callback(null)
    } else {
      callback(new Error(`${taskName} failed`))
    }
  }, 1000)
}

function register(callback) {
  simulateAsync("Registering", callback)
}

function verify(callback) {
  simulateAsync("Verifying", callback)
}

function login(callback) {
  simulateAsync("Logging in", callback)
}

function welcome() {
  console.log("Welcome!")
}

register(function(err) {
  if (err) {
    console.error("Registration error:", err.message)
    return
  }
  verify(function(err) {
    if (err) {
      console.error("Verification error:", err.message)
      return
    }
    login(function(err) {
      if (err) {
        console.error("Login error:", err.message)
        return
      }
      welcome()
    })
  })
})