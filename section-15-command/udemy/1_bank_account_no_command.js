class BankAccount {
	constructor(balance) {
		this.balance = balance;
	}

	deposit(amount) {
		this.balance += amount;
		console.log(`Deposited: ${amount}. Balance is now: ${this.balance}.`);
	}

	withdraw(amount) {
		if (this.balance - amount >= BankAccount.overdraftLimit) {
			this.balance -= amount;
			console.log(
				`Withdrawn: ${amount}. Balance is now: ${this.balance}.`
			);
		}
	}

	toString() {
		return `Balance: ${this.balance}.`;
	}
}

BankAccount.overdraftLimit = -500;

const ba = new BankAccount(100);
ba.deposit(100);
console.log(ba.toString());
