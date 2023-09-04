class Transaction
{
    static transactionId = 0 
    constructor(senderAccountNo, receiverAccountNo, amount, typeOfTransaction, currentBalance)
    {
        this.transactionId = Transaction.transactionId++
        this.date = new Date()
        this.senderAccountNo = senderAccountNo
        this.receiverAccountNo = receiverAccountNo
        this.amount = amount
        this.typeOfTransaction = typeOfTransaction
        this.currentBalance = currentBalance
    }

}

module.exports = Transaction