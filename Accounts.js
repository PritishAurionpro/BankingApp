const Transaction = require("./Transaction")

class Accounts
{
    static allAccounts = []
    static accountNo = 0
    constructor(bank, balance)
    {
        this.accountNo = Accounts.accountNo++
        this.bank = bank
        this.balance = balance
        this.passbook= []
    }

    static createAccount(bank, balance)
    {
        let newAccount = new Accounts(bank, balance)
        Accounts.allAccounts.push(newAccount)
        return newAccount
    }

    static findAccount(accountNo)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof accountNo != 'number')
            {
                throw new Error("Invalid account no")
            }
            for(let index = 0; index<= Accounts.allAccounts.length; index++) //problem
            {
                if (accountNo == Accounts.allAccounts[index].accountNo)
                {
                    return [Accounts.allAccounts[index],index]
                }      
            }        
        } catch (error) {
            console.log(error.message)
        }
    }

    static deleteAccount(accountNo)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("admins cannnot delete Accounts")
            }
            if(typeof accountNo != 'number')
            {
                throw new Error("Invalid accountNo")
            }
            // let [customerObj, indexOfCustomerObj] = this.findCustomer(customerId)
            // Customer.allCustomer.splice(indexOfCustomerObj, 1)
        } catch (error) {
            console.log(error.message)
        }

    }

    createTransaction(date, senderId, receiverId, amount, typeOfTransaction, currentBalance)
    {
        try {
            if(currentBalance < 0)
            {
                throw new Error('insufficient balance')
            }
            let newTransaction = Transaction.createTransaction(date, senderId, receiverId, amount, typeOfTransaction, currentBalance)
        } catch (error) {
            console.log(error.message)
        }
    }
    deposit(accountNo, amount)
    {
        this.balance = this.balance + amount
        let depositTransaction = this.createTransaction(date, accountNo, accountNo, amount, 'deposit', this.balance)
        this.passbook.push(depositTransaction)
    }

    withdraw (accountNo, amount)
    {
        try {
            if(this.balance <= 1000)
            {
                throw new Error('Insufficient Balance')
            }
            if (this.balance - amount <= 1000)
            {
                throw new Error('Insufficicent Balance')
            }
            this.balance = this.balance - amount
            let withdrawTransaction = this.createTransaction(new Date(), accountNo, accountNo, amount, 'withdraw', this.balance)
            this.passbook.push(withdrawTransaction)
        } catch (error) {
            console.log(error.message)
        }
    }

    sendMoney(amount, senderId, receiverId)
    {
        if (this.balance - amount <= 1000)
        {
            throw new Error("Insufficient Balance")
        }
        this.balance = this.balance - amount
        let sendMoneyTransaction = this.createTransaction(new Date(), senderId, receiverId, amount, 'Send Money', this.balance)
        this.passbook.push(sendMoneyTransaction)   
    }

    receiveMoney(amount, senderId, receiverId)
    {
        this.balance = this.balance + amount
        let receiveMoneyTransaction = this.createTransaction(new Date(), senderId, receiverId, amount, 'Receive Money', this.balance)
        this.passbook.push(receiveMoneyTransaction)   
    }

    getPassbook()
    {
        return this.passbook
    }

    //condition if bank == bank name 
    //push account obj into that banks obj list
}
module.exports = Accounts