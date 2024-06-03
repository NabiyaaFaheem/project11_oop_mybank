import inquirer from "inquirer";


class Bank {
    private balance: number;

    constructor() {
        this.balance = 0;
    }

    createAccount(name: string, initialDeposit: number): void {
        console.log(`Account created for ${name}`);
        this.balance = initialDeposit;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ${amount} dollars`);
    }

    withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount} dollars`);
        } else {
            console.log("Insufficient funds");
        }
    }

    checkBalance(): void {
        console.log(`Your balance is ${this.balance} dollars`);
    }
}

const bank = new Bank();

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Create Account', 'Deposit', 'Withdraw', 'Check Balance', 'Exit']
        }
    ]).then(answer => {
        switch (answer.choice) {
            case 'Create Account':
                createAccount();
                break;
            case 'Deposit':
                deposit();
                break;
            case 'Withdraw':
                withdraw();
                break;
            case 'Check Balance':
                checkBalance();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
        }
    });
}

function createAccount() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:'
        },
        {
            type: 'number',
            name: 'initialDeposit',
            message: 'Enter initial deposit:'
        }
    ]).then(answers => {
        const { name, initialDeposit } = answers;
        bank.createAccount(name, initialDeposit);
        mainMenu();
    });
}

function deposit() {
    inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter amount to deposit:'
    }).then(answer => {
        const { amount } = answer;
        bank.deposit(amount);
        mainMenu();
    });
}

function withdraw() {
    inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter amount to withdraw:'
    }).then(answer => {
        const { amount } = answer;
        bank.withdraw(amount);
        mainMenu();
    });
}

function checkBalance() {
    bank.checkBalance();
    mainMenu();
}

mainMenu();