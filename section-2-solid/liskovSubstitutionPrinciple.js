class Rectangle {
	constructor(width, height) {
		this._width = width;
		this._height = height;
	}

	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}

	set width(value) {
		this._width = value;
	}
	set height(value) {
		this._height = value;
	}

	get area() {
		return this._width * this._height;
	}

	toString() {
		return `${this._width}x${this._height}`;
	}
}

let useIt = function (rc) {
	const width = rc.width;
	rc.height = 10;
	console.log(`Expected area of ${10 * width} \n` + `Got ${rc.area}`);
};

console.log("\n Rectangle: ==============");

const rc = new Rectangle(2, 3);
console.log(rc.area);
console.log(rc.toString());
useIt(rc);

class Square extends Rectangle {
	constructor(size) {
		super(size, size);
	}

	set width(value) {
		this._width = this._height = value;
	}

	set height(value) {
		this._height = this._width = value;
	}
}

console.log("\nSquare:===========");

const sq = new Square(5);
console.log(sq.toString());
sq.width = 10;
console.log(sq.toString());
useIt(sq);
