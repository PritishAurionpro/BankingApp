class Transaction
{
    static id = 0
    constructor(date, senderId, receiverId, amount, typeOfTransaction, currentBalance)
    {
        this.transactionId = Transaction.id++
        this.date = date
        this.senderId = senderId
        this.receiverId = receiverId
        this.amount = amount
        this.typeOfTransaction = typeOfTransaction
        this.currentBalance = currentBalance
    }

    static createTransaction(date, senderId, receiverId, amount, typeOfTransaction, currentBalance)
    {
        return new Transaction(date,senderId, receiverId, typeOfTransaction, currentBalance)
    }
}
module.exports = Transaction