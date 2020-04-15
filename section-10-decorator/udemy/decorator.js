class Shape {}

class Circle extends Shape {
	constructor(radius = 0) {
		super();
		this.radius = radius;
	}

	resize(factor) {
		this.radius *= factor;
	}

	toString() {
		return `This circle has radius of ${this.radius} `;
	}
}

// so, now if I have decided to add color to my circle, one way is to update my base class Shape with color property:
// class Shape {
// 	constructor(color) {
// 		this.color = color;
// 	}
// }

// but then we have to update our Circle class in order to use the color, which will breach the Open Close Principle,
//as better alternative - we can use a Decorator class:

class ColoredShape extends Shape {
	constructor(shape, color) {
		super();
		this.shape = shape;
		this.color = color;
	}

	toString() {
		return `${this.shape.toString()} has the color ${this.color}.`;
	}
}

const circle = new Circle(5);

console.log(circle.toString());

const coloredCircle = new ColoredShape(circle, "red");

console.log(coloredCircle.toString());
