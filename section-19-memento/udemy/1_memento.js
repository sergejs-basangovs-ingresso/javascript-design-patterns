class Memento {
	constructor(balance) {
		// the idea here is that memento is going to store the
		//BankAccount state at a particular moment ( in our case the BankAccount has the only prop is balance)
		this.balance = balance;
		//as soon as memento is installed , you should not modify the memento
	}
}

class BankAccount {
	constructor(balance = 0) {
		this.balance = balance;
	}
	deposit(amount) {
		this.balance += amount;
		//additionally to incrementing the balance,
		// we shall also add the memento, so whoever has modified the balance, will have a reference to that point
		return new Memento(this.balance);
	}

	restore(m) {
		// we just restore the balance to the balance saved in memento:
		this.balance = m.balance;
	}

	toString() {
		return `Balance: ${this.balance}`;
	}
}

const ba = new BankAccount(100);
const m1 = ba.deposit(50);
const m2 = ba.deposit(25);

console.log(ba.toString());

ba.restore(m1);
console.log(ba.toString());

ba.restore(m2);
console.log(ba.toString());
