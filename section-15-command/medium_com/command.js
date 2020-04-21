class SpecialMath {
	constructor(value) {
		this._value = value;
	}

	square() {
		return this._value ** 2;
	}

	cube() {
		return this._value ** 3;
	}

	squareRoot() {
		return Math.sqrt(this._value);
	}
}

class Command {
	constructor(subject) {
		this._subject = subject;
		this.commandsExecuted = [];
	}

	execute(command) {
		this.commandsExecuted.push(command);
		return this._subject[command]();
	}
}

const command = new Command(new SpecialMath(5));

console.log(command.execute("square"));
console.log(command.execute("cube"));
console.log(command.execute("squareRoot"));
