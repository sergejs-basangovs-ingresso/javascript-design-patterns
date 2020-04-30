// 1+ ( 2+3 ) , lets write it in object oriented way :)

class NumberExpression {
	constructor(value) {
		this.value = value;
	}

	accept(visitor) {
		visitor.visitNumber(this);
	}
}

class AdditionExpression {
	constructor(left, right) {
		this.left = left; // this left operand to be either expression or a number
		this.right = right; // this right operand going to be either expression or a number
	}

	accept(visitor) {
		visitor.visitAddition(this);
	}
}

class Visitor {
	constructor() {
		this.buffer = [];
	}
	visitNumber(e) {}
	visitAddition(e) {}
}

class ExpressionPrinter extends Visitor {
	constructor() {
		super();
	}

	visitNumber(e) {
		this.buffer.push(e.value);
	}
	visitAddition(e) {
		this.buffer.push("(");
		e.left.accept(this);
		this.buffer.push("+");
		e.right.accept(this);
		this.buffer.push(")");
	}

	toString() {
		return this.buffer.join("");
	}
}

class ExpressionCalculator extends Visitor {
	constructor() {
		super();
		this.result = 0;
	}
	visitNumber(e) {
		this.result = e.value;
	}
	visitAddition(e) {
		e.left.accept(this);
		const temp = this.result;
		e.right.accept(this);
		this.result += temp;
	}
}
//========= use: =================
const e = new AdditionExpression(
	new NumberExpression(1),
	new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);

const ep = new ExpressionPrinter();
const ec = new ExpressionCalculator();

ep.visitAddition(e);
ec.visitAddition(e);

console.log(`${ep.toString()} = ${ec.result}`);
