class VectorRenderer {
	renderTriangle() {
		return "Drawing Triangle shape";
	}

	renderSquare() {
		return "Drawing Square shape";
	}
}

class RasterRenderer {
	renderTriangle() {
		return "Drawing Triangle as pixels";
	}

	renderSquare() {
		return "Drawing Square as pixels";
	}
}

class Shape {
	constructor(name) {
		this.name = name;
	}
}

class Triangle extends Shape {
	constructor(renderer) {
		super("triangle");

		this.renderer = renderer;
	}

	toString() {
		return this.renderer.renderTriangle();
	}
}

class Square extends Shape {
	constructor(renderer) {
		super("square");
		this.renderer = renderer;
	}

	toString() {
		return this.renderer.renderSquare();
	}
}

const [vector, raster] = [new VectorRenderer(), new RasterRenderer()];

const triangle_1 = new Triangle(vector);
const triangle_2 = new Triangle(raster);
const sq_1 = new Square(vector);
const sq_2 = new Square(raster);

console.log(triangle_1.toString(), "\n", triangle_2.toString());
console.log(sq_1.toString(), "\n", sq_2.toString());
