class Bank
{
    static allBank = []
    static bankId = 0
    constructor(fullName, abbreviation)
    {
        this.bankId = Bank.bankId++,
        this.fullName = fullName
        this.abbreviation = abbreviation
        this.account = []
    }

    // makeAbbr(fullName) 
    // {
    //     const words = fullName.split('')
    //     const abbreviation = words.map(words => word[0].toUpperCase()).join('.')
    //     return abbreviation
    // }
    
    static createBank(fullName)
    {
        if(typeof fullName != 'string')
        {
            throw new Error("Invalid Bank name")
        }
        let abbreviation = fullName.split(' ').map(x => x.charAt(0)).join('')
        let newBank = new Bank(fullName, abbreviation)
        Bank.allBank.push(newBank)
        return newBank
    }
    
    static findBank(bankId)
    {
        if(typeof bankId != 'number')
        {
            throw new Error("Invalid bank id")
        }
        for(let index = 0; index<= Bank.allBank.length; index++)
        {
            if (bankId == Bank.allBank[index].bankId)
            {
                return [Bank.allBank[index],index]
            }      
        }
        return [null, -1]        
    }

    static updateBank(bankId, parameter, newValue)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error("Only admins can update bank")
            }
            if(typeof bankId != 'number')
            {
                throw new Error("Invalid bank id")
            }
            if(parameter != 'full name')
            {
                throw new Error("Invalid bank id")
            }
        } catch (error) {
            console.log(error.message)
        }   
            let [bankObj, indexOfBankObj] = this.findBank(bankId)
        switch(parameter)
        {
            case 'bank name': bankObj.updateFullName(newValue)
                break;
            default:
                break;
        }
    }
    updateFullName(newValue)
    {
        try {
            if(typeof newValue != 'string' )
            {
                throw new Error("Invalid name")
            }
            this.fullName = newValue
        } catch (error) {
            console.log(error.message);
        }
    }
    static deleteBank(bankId)
    {
        try {
            if(!this.isAdmin)
            {
                throw new Error("Only admins can create customer")
            }
            if(typeof bankId != 'number')
            {
                throw new Error("Invalid bank id")
            }
            let [BankObj, indexOfBankObj] = this.findBank(bankId)
            Bank.allBank.splice(indexOfBankObj, 1)
        } catch (error) {
            console.log(error.message)
        }
    }
}
module.exports = Bank