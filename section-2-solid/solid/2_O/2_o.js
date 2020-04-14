//Open Closed Principle:

class Shape {
	get area() {
		throw new Error("area method must be implemented.");
	}
}

class Square extends Shape {
	constructor(size) {
		super();
		this.type = "square";
		this.size = size;
	}

	get area() {
		return this.size ** 2;
	}
}

class Circle extends Shape {
	constructor(radius) {
		super();
		this.type = "circle";
		this.radius = radius;
	}

	get area() {
		return Math.PI * this.radius ** 2;
	}
}

class Rect extends Shape {
	constructor(width, height) {
		super();
		this.type = "rectangle";
		this.width = width;
		this.height = height;
	}

	get area() {
		return this.width * this.height;
	}
}

class Triangle extends Shape {
	constructor(base, height) {
		super();
		this.type = "triangle";
		this.base = base;
		this.height = height;
	}

	get area() {
		return (this.base * this.height) / 2;
	}
}

class AreaCalculator {
	constructor(shapes = []) {
		this.shapes = shapes;
	}

	areaSum() {
		return this.shapes.reduce((accumulator, shape) => {
			accumulator += shape.area;
			return accumulator;
		}, 0);
	}
}

const calc = new AreaCalculator([
	new Square(10),
	new Circle(3),
	new Circle(5),
	new Rect(6, 7),
	new Triangle(3, 4),
]);
console.log(calc.areaSum());
