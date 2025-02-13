function createBankAccount(initialBalance) {
    let balance = initialBalance
  
    return {
      deposit: function(amount)  {
        balance = balance + amount
        return balance
      },
      withdraw: function(amount)  {
        if (balance >= amount)
        {
          balance = balance-amount
          return balance
        } 
        else
        {
          return "Insufficient funds"
        }
      },
      getBalance:function () {
        return balance
      },
    }
  }
  
  let account = createBankAccount(100)
  console.log(account.deposit(50))
  console.log(account.withdraw(30))
  console.log(account.getBalance())
  console.log(account.withdraw(300))