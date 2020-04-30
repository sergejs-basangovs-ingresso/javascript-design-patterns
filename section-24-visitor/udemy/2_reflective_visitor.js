// 1+ ( 2+3 ) , lets write it in object oriented way :)
class NumberExpression {
	constructor(value) {
		this.value = value;
	}
}

class AdditionExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}
}

class ExpressionPrinter {
	// print(e, buffer), where the buffer= [], and e - an element, but how shall we
	// decide which element is it ? Number of Expression element ?
	print(e, buffer) {
		if (e instanceof NumberExpression) {
			buffer.push(e.value);
		} else if (e instanceof AdditionExpression) {
			buffer.push("(");
			this.print(e.left, buffer);
			buffer.push("+");
			this.print(e.right, buffer);
			buffer.push(")");
		}
	}
}

const e = new AdditionExpression(
	new NumberExpression(1),
	new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);

const ep = new ExpressionPrinter();
const buffer = [];
ep.print(e, buffer);

console.log(buffer.join(""));
