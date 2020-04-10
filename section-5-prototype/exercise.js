class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Line {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	deepCopy() {
		// todo
		const start = { ...this.start };
		const end = { ...this.end };
		return new Line(start, end);
	}
}

const line = new Line(new Point(2, 3), new Point(9, 11));
const line2 = line.deepCopy();

console.log(line);
console.log(line2);

line.start.x = 1;

console.log(line);
console.log(line2);
