class Memento {
	constructor(balance) {
		this.balance = balance;
	}
}

class BankAccount {
	constructor(balance = 0) {
		this.balance = balance;
		this.changes = [new Memento(balance)]; // all changes memory
		this.current = 0; // the pointer to the current point in the memory
	}
	deposit(amount) {
		this.balance += amount;
		const m = new Memento(this.balance);
		this.changes.push(m);
		this.current++; //advance current pointer one step forward
		return m;
	}

	restore(m) {
		//the reason we check for m - is that maybe after undoing/redoing,
		// the memento may have a null value
		if (m) {
			this.balance = m.balance;
			this.changes.push(m);
			this.current = this.changes.length - 1;
		}
	}

	undo() {
		// verify if the current pointer is not the initial one:
		if (this.current > 0) {
			// current pointer: one step backwards
			// then get the memento of the current pointer
			const m = this.changes[--this.current];
			this.balance = m.balance;
			return m;
		}
		return null;
	}

	redo() {
		// verify if the current pointer can move one step forward within the range of changes:
		if (this.current + 1 < this.changes.length) {
			// current pointer: one step forward
			// then get the memento of the current pointer
			const m = this.changes[++this.current];
			this.balance = m.balance;
			return m;
		}
		return null;
	}

	toString() {
		return `Balance: ${this.balance}`;
	}
}

const ba = new BankAccount(100);
const m1 = ba.deposit(50);
const m2 = ba.deposit(25);
console.log(ba.toString());

ba.undo();
console.log("Undo 1: ", ba.toString());

ba.undo();
console.log("Undo 2: ", ba.toString());

ba.redo();
console.log("Redo 1: ", ba.toString());

ba.redo();
console.log("Redo 2: ", ba.toString());
