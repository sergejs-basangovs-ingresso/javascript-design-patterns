class Token {
	constructor(value = 0) {
		this.value = value;
	}
}

class Memento {
	constructor() {
		this.tokens = [];
	}
}

class TokenMachine {
	constructor() {
		// todo
		this.tokens = [];
	}

	addTokenValue(value) {
		return this.addToken(new Token(value));
	}

	addToken(token) {
		// todo
		this.tokens.push(token);
		const m = new Memento();
		m.tokens = this.tokens.map((item) => new Token(item.value));

		return m;
	}

	revert(m) {
		// todo
		if (m) {
			this.tokens = m.tokens.map((item) => new Token(item.value));
		}
	}

	print() {
		console.log(JSON.stringify(this, null, 2));
	}
}

const tm = new TokenMachine();
const m1 = tm.addTokenValue(123);
tm.print();
console.log("add token");

const m2 = tm.addTokenValue(333);
tm.print();

console.log("\n===== revert to m1 ======== \n");

tm.revert(m1);
tm.print();
