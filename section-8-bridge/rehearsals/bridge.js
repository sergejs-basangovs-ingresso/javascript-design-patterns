// colors => red, blue, yellow
// shapes => triangle, square, circle

class Shape {
	constructor(color) {
		this.color = color;
	}
}

class Color {
	constructor(type) {
		this.type = type;
	}

	getColor() {
		return this.type;
	}
}

class Square extends Shape {
	constructor(color, size) {
		super(color);
		this.size = size;
	}
	info() {
		console.log(
			`This square is of ${this.color} color and has size of: ${this.size}`
		);
	}
}

class Triangle extends Shape {
	constructor(color, base, height) {
		super(color);
		this.base = base;
		this.height = height;
	}

	info() {
		console.log(
			`This triangle is of ${this.color} color and has base: ${this.base} and height: ${this.height}`
		);
	}
}

class Circle extends Shape {
	constructor(color, radius) {
		super(color);
		this.radius = radius;
	}

	info() {
		console.log(
			`This circle is of ${this.color} color and has radius of: ${this.radius}`
		);
	}
}

const red = new Color("red").getColor();
const blue = new Color("blue").getColor();
const yellow = new Color("yellow").getColor();

const square = new Square(red, 4);
const triangle = new Triangle(yellow, 6, 5);
const circle = new Circle(blue, 18);

square.info();
triangle.info();
circle.info();
