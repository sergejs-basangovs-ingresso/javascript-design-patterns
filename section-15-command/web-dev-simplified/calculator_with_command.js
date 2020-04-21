class Calculator {
	constructor() {
		this.value = 0;
		// keep track of all commands executed in history
		this.history = [];
	}

	executeCommand(command) {
		this.value = command.execute(this.value);
		this.history.push(command);
	}

	undo() {
		const command = this.history.pop();
		this.value = command.undo(this.value);
	}
}

class AddCommand {
	constructor(valueToAdd) {
		this.valueToAdd = valueToAdd;
	}

	execute(currentValue) {
		return currentValue + this.valueToAdd;
	}

	undo(currentValue) {
		return currentValue - this.valueToAdd;
	}
}

class MultiplyCommand {
	constructor(valueToMultiply) {
		this.valueToMultiply = valueToMultiply;
	}

	execute(currentValue) {
		return currentValue * this.valueToMultiply;
	}

	undo(currentValue) {
		return currentValue / this.valueToMultiply;
	}
}

class AddThenMultiply {
	constructor(valueToAdd, valueToMultiply) {
		this.addCommand = new AddCommand(valueToAdd);
		this.multiplyCommand = new MultiplyCommand(valueToMultiply);
	}

	execute(currentValue) {
		const newValue = this.addCommand.execute(currentValue);
		return this.multiplyCommand.execute(newValue);
	}
	undo(currentValue) {
		const newValue = this.multiplyCommand.undo(currentValue);
		return this.addCommand.undo(newValue);
	}
}

//************************************************* */
//************************************************* */
const calculator = new Calculator();
//add 10
calculator.executeCommand(new AddCommand(10));
console.log(calculator);

// multiply by 20
calculator.executeCommand(new MultiplyCommand(20));
console.log(calculator);

// undo last ( multiply x20)
calculator.undo();
console.log(calculator);

//undo last (add  10)
calculator.undo();
console.log(calculator);

// add 10 then multiply by 20:
calculator.executeCommand(new AddThenMultiply(10, 20));
console.log(calculator);

// undo AddThenMultiply operation:
calculator.undo();
console.log(calculator);
