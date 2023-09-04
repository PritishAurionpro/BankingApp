const Transaction = require("./Transaction")

class Account
{
    static accountNo = 0 
    constructor(bankName, balance)
    {   
        this.accountNo = Account.accountNo++
        this.bankName = bankName
        this.balance = balance
        this.passbook = []
    }

    // static createAccount(bankFullName, balance)
    // {
    //     new Account(bankFullName, balance)
    // }

    deposit(amount)
    {
        this.balance += amount
        let newdeposit = new Transaction(this.accountNo, this.accountNo, amount, 'credit', this.balance)
        this.passbook.push(newdeposit)
        return this.balance
    }

    withdraw(amount)
    {
        if(this.balance - amount < 1000)
        {
            throw new Error('Insufficent account balance')
        }
        this.balance -= amount
        let newWithdraw = new Transaction(this.accountNo, this.accountNo, amount, 'debit', this.balance)
        this.passbook.push(newWithdraw)
        return this.balance

    }

    sendMoney(receiverAccountNo, amount) 
    {
        if(this.balance - amount < 1000)
        {
            throw new Error('Insufficent account balance')
        }
        this.balance -= amount
        let newSendMoney = new Transaction(this.accountNo, receiverAccountNo, amount, 'debit', this.balance)
        this.passbook.push(newSendMoney)
        return this.balance   
    }

    receiveMoney(senderAccountNo, amount) 
    {
        this.balance += amount
        let newReceiveMoney = new Transaction(senderAccountNo, this.accountNo, amount, 'credit', this.balance)
        this.passbook.push(newReceiveMoney)
        return this.balance
    }

    // getPassbook()
    // {
    //     this.passbook
    // }
}

module.exports = Account