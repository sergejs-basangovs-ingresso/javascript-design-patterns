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
			return true;
		}
		return false;
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
		this.succeeded = false;
	}

	call() {
		switch (this.action) {
			case Action.deposit:
				this.account.deposit(this.amount);
				this.succeeded = true;
				break;
			case Action.withdraw:
				this.succeeded = this.account.withdraw(this.amount);
				break;
			default:
				return;
		}
	}

	undo() {
		if (!this.succeeded) return;
		switch (this.action) {
			case Action.deposit:
				this.account.withdraw(this.amount);
				break;
			case Action.withdraw:
				this.account.deposit(this.amount);
				break;
			default:
				return;
		}
	}
}

const ba = new BankAccount(100);

const cmd = new BankAccountCommand(ba, Action.withdraw, 650);
cmd.call();

console.log(ba.toString());
cmd.undo();
console.log(ba.toString());

const cmd2 = new BankAccountCommand(ba, Action.withdraw, 150);
cmd2.call();

console.log(ba.toString());
cmd2.undo();
console.log(ba.toString());
