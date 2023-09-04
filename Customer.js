const Account = require("./Account")
const Bank = require("./Bank")
const Transaction = require("./Transaction")

class Customer
{   
    static customerId = 0
    static allCustomer = []
    constructor(firstName, lastName, isAdmin)
    {
        this.customerId = Customer.customerId++
        this.firstName = firstName
        this.lastName = lastName
        this.isAdmin = isAdmin
        this.accounts = []
    }
    
    static createAdmin(firstName, lastName)
    {
        try {
            if (typeof firstName != 'string' && typeof lastName != 'string')
            {
                throw new Error('Invalid Admin name Input')
            }
            return new Customer(firstName, lastName, true)
        } catch (error) {
            console.log(error.message)
        }
    }

    createCustomerByAdmin(firstName, lastName)
    {
        try {
            if (!this.isAdmin)
            {
                throw new error('Only admins can create customer')
            }
            if (typeof firstName != 'string' && typeof lastName != 'string')
            {
                throw new Error('Invalid Customer name Input')
            }
            let newCustomer = new Customer(firstName, lastName, false)
            Customer.allCustomer.push(newCustomer)
            return newCustomer
        } catch (error) {
            console.log(error.message)
        }
    }

    #findCustomer(customerId)
    {
        try {
            // if(!this.isAdmin)
            // {
            //     throw new Error("Only admins can create customer")
            // }
            if(typeof customerId != 'number')
            {
                throw new Error("Invalid Customer id")
            }
            for(let index = 0; index<= Customer.allCustomer.length; index++)
            {
                if (customerId == Customer.allCustomer[index].customerId)
                {
                    return [Customer.allCustomer[index],index]
                }      
            }
            return[null, -1]        
        } catch (error) {
            console.log(error.message)
        }
    }    
        
    updateCustomer(customerId, parameter, newValue)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof customerId != 'number')
            {
                throw new Error("Invalid Customer id")
            }
            if(parameter != 'first name' && parameter != 'last name')
            {
                throw new Error("Invalid parameter")
            }
            let [customerObj, indexOfCustomerObj] = this.#findCustomer(customerId)
            if(indexOfCustomerObj == -1)
            {
                throw new Error('Customer not found')
            }
            switch(parameter)
            {
                case 'first name': customerObj.#updateFirstName(newValue)
                    break;
                case 'last name': customerObj.#updateLastName(newValue)
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error.message)
        }
    }    
    #updateFirstName(newValue)
    {
        if(typeof newValue != 'string' )
            {
                throw new Error("Invalid name")
            }
        this.firstName = newValue
    }
    #updateLastName(newValue)
    {
        if(typeof newValue != 'string' )
        {
            throw new Error("Invalid name")
        }
        this.lastName = newValue
    }

    deleteCustomer(customerId)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof customerId != 'number')
            {
                throw new Error("Invalid Customer id")
            }
            let [customerObj, indexOfCustomerObj] = this.#findCustomer(customerId)
            if(indexOfCustomerObj == -1)
            {
                throw new Error('Customer not found')
            }
            Customer.allCustomer.splice(indexOfCustomerObj, 1)
        } catch (error) {
            console.log(error.message)
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////

    createBankByAdmin(bankFullName)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error ("Only admins can create bank")
            }
            if(typeof bankFullName != 'string')
            {
                throw new Error ("Invalid bank name input")
            }
            return Bank.createBank(bankFullName)
        } catch (error) {
            console.log(error.message)
        }
    }

    findBankByAdmin(bankId)  //kinda useless 
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

    getAllBanksByAdmin()
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error('only Admins can get all banks list')
            }
            return Bank.allBank //shortcut without creating method in bank class
        } catch (error) {
            console.log(error.message)
        }
    }

    updateBankByAdmin(bankId, parameter, newValue)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error('only Admins can Update banks')
            }
            if(typeof bankId != 'number')
            {
                throw new Error('Invalid Bank id input')
            }
            if(parameter != 'bank name')
            {
                throw new Error('Invalid parameter')
            }
            if (typeof newValue != 'string')
            {
                throw new Error('Invalid new value ')
            }
            let [bankObj, bankObjIndex] = this.findBankByAdmin(bankId)
            if(bankObjIndex == -1)
            {
                throw new Error("Bank not found")
            }
            bankObj.updateBank(parameter, newValue)
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
            let [bankObj, bankObjIndex] = this.findBankByAdmin(bankId)
            if(bankObjIndex == -1)
            {
                throw new Error("Bank not found")
            }
            bankObj.deleteBank(bankObjIndex) 
        } catch (error) {
            console.log(error.message)
        }   
    }

////////////////////////////////////////////////////////////////////////////////////////////
    
    createAccount(bankId, balance)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error ("Only customers can create Account")
            }
            if(typeof bankId != 'number')
            {
                throw new Error ("Invalid bank Id input")
            }
            if(typeof balance != 'number')
            {
                throw new Error ("Invalid balance input")
            }
            if(balance < 1000)
            {
                throw new Error ("Minmum balance for opening is 1000")
            }
            let [bankObj, bankObjIndex] = Bank.findBank(bankId)
            if(bankObjIndex == -1)
            {
                throw new Error("Bank not found")
            }
            let bankName = bankObj.fullName // bankname found
            let newAccount = new Account(bankName, balance) //create accounts contructor ke parameter update kar
            bankObj.updateBankAccountsList(newAccount) 
            this.accounts.push(newAccount)
        } catch (error) {
            console.log(error.message)
        }
    }

    findAccountByCustomer(accountNo)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error('Only Customers can find accounts')
            }
            if(typeof accountNo != 'number')
            {
                throw new Error('Invaild account no input')
            }
            for(let index = 0; index<= this.accounts.length; index++)
            {
                if (accountNo == this.accounts[index].accountNo)
                {
                    return [this.accounts[index],index]
                }      
            }
            return [null, -1]        
        } catch (error) {
            console.log(error.message)
        }
    }

    getAllCustomerAccounts()
    {
        try {
            if(this.isAdmin)
            {
                throw new Error('Admins cannot view Customer Accounts')
            }
            return this.accounts  
        } catch (error) {
            console.log(error.message)
        }
    }

    deleteAccount(bankId, accountNo)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Only Customer can delete account")
            }
            if(typeof accountNo != 'number')
            {
                throw new Error("Invalid Bank id")
            }
            let [accountObj, accountObjIndex] = this.findAccountByCustomer(accountNo)
            if(accountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            let [bankObj, bankObjIndex] = Bank.findBank(bankId)
            if(bankObjIndex == -1)
            {
                throw new Error('Bank not found')
            }
            bankObj.deleteAccountFromBank(accountObjIndex) // delete form account
            this.accounts.splice(accountObjIndex, 1) //check
        } catch (error) {
            console.log(error.message)
        }   
    }   
    
///////////////////////////////////////////////////////////////////////////////////////

    deposit(accountNo, amount)
    {
        try {
            if(typeof accountNo != 'number')
            {
                throw new Error('Invalid account no. input')
            }
            if(typeof amount != 'number' && amount <= 0)
            {
                throw new Error('Invalid amount Input')
            }
            let [accountObj, accountObjIndex] = this.findAccountByCustomer(accountNo)
            if(accountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            accountObj.deposit(amount)
        } catch (error) {
            console.log(error.message)
        }
    }

    withdraw(accountNo, amount)
    {
        try {
            if(typeof accountNo != 'number')
            {
                throw new Error('Invalid account no. input')
            }
            if(typeof amount != 'number')
            {
                throw new Error('Invalid amount Input')
            }
            let [accountObj, accountObjIndex] = this.findAccountByCustomer(accountNo)
            if(accountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            accountObj.withdraw(amount)
        } catch (error) {
            console.log(error.message)
        }
    }

    selfTransfer(senderAccountNo, receiverAccountNo, amount)
    {
        try {
            if(typeof senderAccountNo != 'number')
            {
                throw new Error('Invalid sender account no. input')
            }
            if(typeof receiverAccountNo != 'number')
            {
                throw new Error('Invalid receiver account no. input')
            }
            if(typeof amount != 'number')
            {
                throw new Error('Invalid amount Input')
            }
            let [senderAccountObj, senderAccountObjIndex] = this.findAccountByCustomer(senderAccountNo)
            if(senderAccountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            let [receiverAcountObj, receiverAccountObjIndex] = this.findAccountByCustomer(receiverAccountNo)
            if (receiverAccountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            senderAccountObj.sendMoney(receiverAccountNo, amount )
            receiverAcountObj.receiveMoney(senderAccountNo, amount)
        } catch (error) {
            console.log(error.message)
        }
    }

    moneyTransfer(senderAccountNo, customerId, receiverAccountNo, amount)
    {
        try {
            if(typeof senderAccountNo != 'number')
            {
                throw new Error('Invalid sender account no. input')
            }
            if(typeof customerId != 'number')
            {
                throw new Error('Invalid customerid  input')
            }
            if(typeof receiverAccountNo != 'number')
            {
                throw new Error('Invalid receiver account no. input')
            }
            if(typeof amount != 'number')
            {
                throw new Error('Invalid amount Input')
            }
            let [senderAccountObj, senderAccountObjIndex] = this.findAccountByCustomer(senderAccountNo)
            if(senderAccountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            let [customerObj, indexOfCustomerObj] = this.#findCustomer(customerId)
            if(indexOfCustomerObj == -1)
            {
                throw new Error('Customer not found')
            }
            let [receiverAcountObj, receiverAccountObjIndex] = customerObj.findAccountByCustomer(receiverAccountNo)
            if(receiverAccountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            senderAccountObj.sendMoney(receiverAccountNo, amount)
            receiverAcountObj.receiveMoney(senderAccountNo, amount)
        } catch (error) {
            console.log(eror.message)
        }
    }

    getPassbook(accountNo)
    {
        try {
            if(typeof accountNo != 'number')
            {
                throw new Error('Invalid account number Input')
            }
            let [accountObj, accountObjIndex] = this.findAccountByCustomer(accountNo)
            if(accountObjIndex == -1)
            {
                throw new Error('Account not found')
            }
            return accountObj.passbook   
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = Customer