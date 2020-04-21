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

const Action = Object.freeze({
	deposit: 1,
	withdraw: 2,
});

class BankAccountCommand {
	constructor(account, action, amount) {
		this.account = account;
		this.action = action;
		this.amount = amount;
	}

	call() {
		switch (this.action) {
			case Action.deposit:
				this.account.deposit(this.amount);
				break;
			case Action.withdraw:
				this.account.withdraw(this.amount);
				break;
			default:
				return;
		}
	}
}

const ba = new BankAccount(100);

const cmd = new BankAccountCommand(ba, Action.deposit, 50);
cmd.call();
