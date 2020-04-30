// 1+ ( 2+3 ) , lets write it in object oriented way :)
class NumberExpression {
	constructor(value) {
		this.value = value;
	}

	print(buffer) {
		buffer.push(this.value.toString());
	}
}

class AdditionExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}
	print(buffer) {
		buffer.push("(");
		this.left.print(buffer);
		buffer.push("+");
		this.right.print(buffer);
		buffer.push(")");
	}
}

const e = new AdditionExpression(
	new NumberExpression(1),
	new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);

// now if I want to print it in this format: 1+(2+3) for example.
const buffer = [];
e.print(buffer);
console.log(buffer.join(""));
