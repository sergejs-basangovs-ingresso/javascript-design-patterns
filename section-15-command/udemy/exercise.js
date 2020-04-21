let Action = Object.freeze({
	deposit: 0,
	withdraw: 1,
});

class Command {
	constructor(action, amount) {
		this.action = action;
		this.amount = amount;
		this.success = false;
	}
}

class Account {
	constructor() {
		this.balance = 0;
	}

	process(cmd) {
		// todo
		switch (cmd.action) {
			case Action.deposit:
				this.balance += cmd.amount;
				cmd.success = true;
				break;
			case Action.withdraw:
				if (this.balance - cmd.amount >= 0) {
					this.balance -= cmd.amount;
					cmd.success = true;
				} else {
					cmd.success = false;
				}
				break;
			default:
				return;
		}
	}
}

const cmd_100_plus = new Command(Action.deposit, 100);
const cmd_30_minus = new Command(Action.withdraw, 30);

const cmd_100_minus = new Command(Action.withdraw, 100);

const account = new Account();
console.log(account);

account.process(cmd_100_plus);
console.log(account);
console.log("success: ", cmd_100_plus.success);

account.process(cmd_30_minus);
console.log(account);
console.log("success: ", cmd_30_minus.success);

account.process(cmd_100_minus);
console.log(account);
console.log("success: ", cmd_100_minus.success);
