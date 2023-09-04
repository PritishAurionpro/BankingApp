class Bank
{
    static allBank =[]
    static bankId = 0
    constructor(fullName, Abbreviation)
    {
        this.bankId = Bank.bankId++
        this.fullName = fullName
        this.Abbreviation = Abbreviation
        this.bankAccounts = [] // maybe useless
    }

    static createBank(fullName)
    {
        let Abbreviation = fullName.split(' ').map(x=> x.charAt(0)).join('')
        let newbank = new Bank(fullName, Abbreviation)
        Bank.allBank.push(newbank) 
        return newbank   
    }

    static findBank(bankId)
    {
        for(let index = 0; index <= Bank.allBank.length; index++)
        {
            if(bankId == Bank.allBank[index].bankId)
            {
                return [Bank.allBank[index], index]
            }
        }
        return[null, -1]
    }

    updateBank(parameter, newValue)
    {
        switch(parameter)
        {
            case 'bank name': this.#updateBankName(newValue)
                break;
            default:
                break;
        }
    }

    #updateBankName(newValue)
    {
        let newAbbreviation = newValue.split(' ').map(x=> x.charAt(0)).join('')
        this.fullName = newValue
        this.Abbreviation = newAbbreviation
    }
    
    deleteBank(bankObjIndex)
    {
        Bank.allBank.splice(bankObjIndex, 1)  //can use .this?
    }
    
    updateBankAccountsList(newAccount)
    {
        this.bankAccounts.push(newAccount)   //can use .this?
    }

    deleteAccountFromBank(accountObjIndex)
    {
        if(this.bankAccounts == 0)
        {
            this.bankAccounts.splice(accountObjIndex, 1) //maybe we can use this
        }
    }
}

module.exports = Bank