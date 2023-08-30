const Accounts = require("./Accounts")
const Bank = require("./Bank")
const { bankId } = require("./Bank")

class Customer
{
    static allCustomer = []
    static customerId = 0
    isAdmin = false
    constructor(firstName, lastName, totalBalance, isAdmin)
    {
        this.customerId = Customer.customerId++,
        this.firstName = firstName
        this.lastName = lastName
        this.totalBalance = totalBalance
        this.account = []
        this.isAdmin = isAdmin
    }

    static createAdmin(firstName, lastName)
    {
        try {
            if(typeof firstName != 'string' && lastName != 'string')
            {
                throw new Error("Invalid Admin name")
            }
            return new Customer(firstName, lastName, -1, true)
        } catch (error) {
            console.log(error.message)
        }
    }

    createCustomer(firstName, lastName, totalBalance)
    {
        try {
            if(this.isAdmin == false)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof firstName != 'string' && lastName != 'string')
            {
                throw new Error("Invalid customer name")
            }
            let newCustomer = new Customer(firstName, lastName, totalBalance, false)
            Customer.allCustomer.push(newCustomer)
            return newCustomer
        } catch (error) {
            console.log(error.message)
        }
    }
    findCustomer(customerId)
    {
        try {
            // if(this.isAdmin == false)
            // {
            //     throw new Error("Only admins can create customer")
            // }
            if(typeof customerId != 'number')
            {
                throw new Error("Invalid Customer id")
            }
            for(let index = 0; index<= Customer.allCustomer.length; index++)
            {
                if (customerId == Customer.allCustomer[index].id)
                {
                    return [Customer.allCustomer[index],index]
                }      
            }        
        } catch (error) {
            console.log(error.message)
        }
    }

    updateCustomer(customerId, parameter, newValue)
    {
        try {
            if(this.isAdmin == false)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof customerId != 'number')
            {
                throw new Error("Invalid Customer id")
            }
            if(parameter != 'first name' && parameter != 'last name' && parameter != 'total balance')
            {
                throw new Error("Invalid parameter")
            }
        } catch (error) {
            console.log(error.message)
        }   
            let [customerObj, indexOfCustomerObj] = this.findCustomer(customerId)
        switch(parameter)
        {
            case 'first name': customerObj.updateFirstName(newValue)
                break;
            case 'last name': customerObj.updateLastName(newValue)
                break;
            case 'total balance': customerObj.updateTotalBalance(newValue)
                break;
            default:
                break;
        }
    }
    updateFirstName(newValue)
    {
        try {
            if(typeof newValue != 'string' )
            {
                throw new Error("Invalid name")
            }
            this.firstName = newValue
        } catch (error) {
            console.log(error.message);
        }
    }
    updateLastName(newValue)
    {
        try {
            if(typeof newValue != 'string' )
            {
                throw new Error("Invalid name")
            }
            this.lastName = newValue
        } catch (error) {
            console.log(error.message);
        }
    }
    updateTotalBalance(newValue) //make private and change value internally
    {
        try {
            if(typeof newValue != 'number' )
            {
                throw new Error("Invalid name")
            }
            this.totalBalance = newValue
        } catch (error) {
            console.log(error.message);
        }
    }

    deleteCustomer(customerId)
    {
        try {
            if(this.isAdmin == false)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof customerId != 'number')
            {
                throw new Error("Invalid Customer id")
            }
            let [customerObj, indexOfCustomerObj] = this.findCustomer(customerId)
            Customer.allCustomer.splice(indexOfCustomerObj, 1)
        } catch (error) {
            console.log(error.message)
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////

    createBankByAdmin(bankFullName)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error ("Only admins can create bank")
            }
            Bank.createBank(bankFullName)
        } catch (error) {
            console.log(error.message)
        }
    }

    findBankByAdmin(bankId)
    {
        try {
            if (!this.isAdmin)
            {
                throw new Error("only Admins can Find bank")
            }
            if(typeof bankId != 'number')
            {
                throw new Error("Invalid bank Id")
            }
            return Bank.findBank(bankId)       
        } catch (error) {
            console.log(error.message)
        }
    }

    updateBankByAdmin(bankId, parameter, newValue)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error("Only admins can update bank")
            }
            if(typeof bankId != 'number')
            {
                throw new Error("Invalid Bank id")
            }
            if(typeof parameter != 'string')
            {
                throw new Error("Invalid parameter")
            }
            if(typeof newValue != 'string')
            {
                throw new Error("Invalid value")
            }
            Bank.updateBank(bankId, parameter, newValue)
        } catch (error) {
            console.log(error.message)
        }
    }

    deleteBankByAdmin(bankId)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error("Only admins can update bank")
            }
            if(typeof bankId != 'number')
            {
                throw new Error("Invalid Bank id")
            }
            Bank.deleteBank(bankId)
        } catch (error) {
            console.log(error.message)
        }   
    }

/////////////////////////////////////////////////////////////////////////////////////////////////

    createAccount(bankId, balance)
    {
        try {
            if (this.isAdmin)
            {
                throw new Error("Admin cannot create account")
            }
            if (typeof bankName != 'string')
            {
                throw new Error("Invalid bank name")
            }
            if (typeof balance != 'number')
            {
                throw new Error("Invalid balance")
            }
            let bankObj = Bank.findBank(bankId)
            let newAccount = Accounts.createAccount(bankObj, balance)
            this.account.push(newAccount)
            return newAccounts
        } catch (error) {
            console.log(error.message)
        }
    }

    findAccount(accountNo)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Only customer can find account")
            }
            if(typeof accountNo != 'number')
            {
                throw new Error("Invalid account no")
            }
            return Accounts.findAccount(accountNo)
           } catch (error) {
            console.log(error.message)
        }
    }

    deleteAccount(accountNo)
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
            let [accountObj, indexOfAccountObj] = this.findAccount(accountNo)
            this.account.splice(indexOfAccountObj, 1)
        } catch (error) {
            console.log(error.message)
        }

    }

    deposit(accountNo, amount)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error('only customer can deposit money')
            }
            if(typeof amount != "number")
            {
                throw new Error('Invalid amount')
            }
            let [accountObj, indexOfAccountObj] = this.findAccount(accountNo)
            if(accountObj == null)
            {
                throw new Error('Account no not fount')
            }
            accountObj.deposit(accountNo, amount)
        } catch (error) {
            console.log(error.message)
        }
    }

    withdraw(accountNo, amount)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error('only customer can withdraw money')
            }
            if(typeof amount != "number")
            {
                throw new Error('Invalid amount')
            }
            let [accountObj, indexOfAccountObj] = this.findAccount(accountNo)
            if(accountObj == null)
            {
                throw new Error('Account no not found')
            }
            accountObj.withdraw(accountNo, amount)
        } catch (error) {
            console.log(error.message)
        }
    }

    transferMoney(amount, senderid, receiverid, customerId, type) {
        try {
            if (this.isAdmin) {
                throw new Error('Only customer can transfer money')
            }
            if (typeof amount != 'number') {
                throw new Error('Amount entered should be strictly in numerics')
            }

            let [customerObj, indexOfCustomerObj] = this.findCustomer(customerId)
            if (customerObj == null) {
                throw new Error('Customer id not found')
            }

            let [senderAccount, indexOfSenderAccount] = this.findAccount(senderid)
            if (senderAccount == null) {
                throw new Error('Sender Account No not found')
            }

            let [receiverAccount, indexofreceiver] = customerObj.findAccount(receiverid)
            if (receiverAccount == null) {
                throw new Error('Receiver Account No not found')
            }
          
            senderAccount.sendMoney(amount, senderid, receiverid)
            receiverAccount.receiveMoney(amount, senderid, receiverid)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    passbook(accountNo) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can have access to passbook')
            }

            let [accountObj, indexofAccount] = this.findAccount(accountNo)
            if (accountObj == null) {
                throw new Error('Account No not found')
            }
            let passbookDetails = accountObj.getPassbook()
            return passbookDetails


        } catch (error) {
            console.log(error.message);
        }
    }
   
    //create bank by id
    //CRD

    //deposit(amount, accountid){
    //obj = create.transationobj(date, current balance, selfid, recerver id, type(credit), amount(-1))
    //account.transaction.push(obj) --> list of transation of that account }
    //withdraw(){} --> same as deposit()
    //transfer(amount, self account id, receiver id, receiver account id){}
}
module.exports = Customer