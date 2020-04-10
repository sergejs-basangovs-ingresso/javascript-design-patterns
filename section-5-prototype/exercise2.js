class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Line {
	constructor(start = new Point(0, 0), end = new Point(1, 1)) {
		this.start = start;
		this.end = end;
	}

	clone() {
		// todo
		const proto = Object.getPrototypeOf(this);
		const clonedInstance = Object.create(proto);

		clonedInstance.start = this.start;
		clonedInstance.end = this.end;
		return clonedInstance;
	}
}

const baseLine = new Line();
baseLine.start = new Point(2, 3);
baseLine.end = new Point(9, 11);

const line1 = baseLine.clone();
line1.start = new Point(22, 55);
line1.end = new Point(102, 209);

const line2 = baseLine.clone();

console.log("baseLine: ", baseLine);
console.log("line1: ", line1);
console.log("line2: ", line2);
