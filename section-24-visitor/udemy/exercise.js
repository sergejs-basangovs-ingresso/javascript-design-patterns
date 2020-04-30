// You are asked to implement a visitor called ExpressionPrinter  for printing different mathematical expressions. The range of expressions covers addition and multiplication - please put round brackets around addition operations (but not multiplication ones)! Also, please avoid any blank spaces in output.
// Example:
// Input: AdditionExpression(Value(2), Value(3))
// Output: (2+3)
// Here is the corresponding unit test:
// let simple = new AdditionExpression(
//   new Integer(2), new Integer(3)
// );
// let ep = new ExpressionPrinter();
// ep.visitAddition(simple);
// expect(ep.toString()).toEqual('(2+3)');

// You are asked to implement a visitor called ExpressionPrinter  for printing different mathematical expressions. The range of expressions covers addition and multiplication - please put round brackets around addition operations (but not multiplication ones)! Also, please avoid any blank spaces in output.
// Example:
// Input: AdditionExpression(Value(2), Value(3))
// Output: (2+3)
// Here is the corresponding unit test:
// let simple = new AdditionExpression(
//   new Integer(2), new Integer(3)
// );
// let ep = new ExpressionPrinter();
// ep.visitAddition(simple);
// expect(ep.toString()).toEqual('(2+3)');

class Integer {
	constructor(value) {
		this.value = value;
	}
}

class BinaryExpression {
	constructor(lhs, rhs) {
		this.lhs = lhs;
		this.rhs = rhs;
	}
}

class AdditionExpression extends BinaryExpression {
	constructor(lhs, rhs) {
		super(lhs, rhs);
	}
}

class MultiplicationExpression extends BinaryExpression {
	constructor(lhs, rhs) {
		super(lhs, rhs);
	}
}

class ExpressionPrinter {
	constructor() {
		// todo
		this.buffer = [];
	}

	visitValue(value) {
		// todo
		this.buffer.push(value.value);
	}

	visitAddition(ae) {
		// todo
		this.buffer.push("(");
		if (ae.lhs instanceof AdditionExpression) {
			this.visitAddition(ae.lhs);
		} else if (ae.lhs instanceof Integer) {
			this.visitValue(ae.lhs);
		}
		this.buffer.push("+");
		if (ae.rhs instanceof AdditionExpression) {
			this.visitAddition(ae.rhs);
		} else if (ae.rhs instanceof Integer) {
			this.visitValue(ae.rhs);
		}
		this.buffer.push(")");
	}

	visitMultiplication(me) {
		// todo
		if (me.lhs instanceof MultiplicationExpression) {
			this.visitMultiplication(me.lhs);
		} else if (me.lhs instanceof AdditionExpression) {
			this.visitAddition(me.lhs);
		} else if (me.lhs instanceof Integer) {
			this.visitValue(me.lhs);
		}
		this.buffer.push("*");
		if (me.rhs instanceof MultiplicationExpression) {
			this.visitMultiplication(me.rhs);
		} else if (me.rhs instanceof AdditionExpression) {
			this.visitAddition(me.rhs);
		} else if (me.rhs instanceof Integer) {
			this.visitValue(me.rhs);
		}
	}

	toString() {
		// todo
		return this.buffer.join("");
	}
}

const ae = new AdditionExpression(new Integer(2), new Integer(3));
const me = new MultiplicationExpression(new Integer(2), new Integer(3));
const mixExpression = new MultiplicationExpression(ae, new Integer(3));
const ep = new ExpressionPrinter();

// ep.visitAddition(ae);
ep.visitMultiplication(mixExpression);

console.log(ep.toString());
