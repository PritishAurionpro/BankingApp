const Admin = require("./Admin")
const Customer = require("./Customer")

let admin1 = Customer.createAdmin("james",  "kon") //id 0
console.log(admin1)

let customer1 = admin1.createCustomerByAdmin("sergio", "perez") //id 1
let customer2 = admin1.createCustomerByAdmin("charles", "leclerc") //id 2
let customer3 = admin1.createCustomerByAdmin("max", "vestapen") // id 3
// console.log(Customer.allCustomer) // all banks list
// admin1.updateCustomer(1, "first name", "william") //updateccustomer
// admin1.deleteCustomer(1) //delete cutomer
// console.log(Customer.allCustomer) //all customer list

bank1 = admin1.createBankByAdmin("bank of india")
bank2 = admin1.createBankByAdmin("panjab nation bank")
bank3 = admin1.createBankByAdmin("state bank of india")
// console.log(admin1.getAllBanksByAdmin()) //all banks list
// admin1.updateBankByAdmin(2, 'bank name', 'bank of baroda') //update bank
// admin1.deleteBankByAdmin(1) //delete bank
// console.log(admin1.getAllBanksByAdmin()) //all banks list

let account1 = customer1.createAccount(1,2000) //0
let account2 = customer1.createAccount(1,2300) //1
let account3 = customer2.createAccount(1,1500) //2
// console.log(customer1.getAllCustomerAccounts()) 
// console.log(customer2.getAllCustomerAccounts())
// // customer1.findAccountByCustomer(1)
// customer1.deleteAccount(1, 1)
// console.log(customer1.getAllCustomerAccounts())
// console.log(customer2.getAllCustomerAccounts())

customer1.deposit(1, 200)
customer1.withdraw(0, 300)
customer1.selfTransfer(0, 1, 500)
customer1.moneyTransfer(1, 2, 2, 300)
console.log(customer1.getPassbook(0))
console.log(customer1.getPassbook(1))
console.log(customer2.getPassbook(2))

// console.log(customer1.getAllCustomerAccounts())
// console.log(customer2.getAllCustomerAccounts())

