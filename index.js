const Bank = require("./Bank");
const Customer = require("./Customer");
const { createAdmin } = require("./Customer");

let admin1 = Customer.createAdmin("Pritish", "Parkar")
let customer1 = admin1.createCustomer("Ankith", "Devadiga", 5000)
let customer2 = admin1.createCustomer("Rahul", "K", 6000)
let customer3 = admin1.createCustomer("Shreyas", "c", 7500)

// console.log(Customer.allCustomer)
// admin1.updateCustomer(2, 'last name', 'karkun')
// console.log(admin1.findCustomer(2)) 
// admin1.deleteCustomer(3)
// console.log(Customer.allCustomer)

let bank1 = admin1.createBankByAdmin("Bank of India")
let bank2 = admin1.createBankByAdmin("State Bank of india")
let bank3 = admin1.createBankByAdmin("panjab national bank")

// console.log(admin1.getAllBank())
// admin1.updateBankByAdmin(1, 'bank name', 'oriental bank')
// admin1.deleteBankByAdmin(1)
// console.log(admin1.getAllBank())

let account1 = customer1.createAccount(0, 2500)
let account2 = customer1.createAccount(1, 1000)
// console.log("Account 0 created",customer1.findAccount(0))
// console.log("Account 1 created",customer1.findAccount(1))

// customer1.deposit(0,1500)
// console.log("Account 0 deposite 300",customer1.findAccount(0))
// customer1.withdraw(0, 500)
// console.log("Account 0 withdraw 500",customer1.findAccount(0))
customer1.transferMoney(435, 0, 1, 1)
console.log("Account 0 debit 500",customer1.findAccount(0))
console.log("Account 1 credit 500",customer1.findAccount(0))
// console.log(customer1.passbook(0))







