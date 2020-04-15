// we got several shapes
// we got several ways of rendering these shapes

// 2 hierarchies:
// Shapes: Square, Circle, Triangle ...
// Rendering: Vector, Raster ...
// we must avoid to find ourselves with number of classes like (number of Shapes) x ( number of Rendering type)

class VectorRendering {
	renderCircle(radius) {
		console.log(`I am drawing a circle of radius : ${radius}`);
	}
}

class RasterRendering {
	renderCircle(radius) {
		console.log(` I am drawing pixels for a circle of radius : ${radius}`);
	}
}

// we can put rendering into the shape
class Shape {
	constructor(renderer) {
		this.renderer = renderer;
	}
}
class Circle extends Shape {
	constructor(renderer, radius) {
		super(renderer);
		this.radius = radius;
	}
	draw() {
		this.renderer.renderCircle(this.radius);
	}

	resize(n) {
		this.radius *= n;
	}
}

const raster = new RasterRendering();
const vector = new VectorRendering();
const circle = new Circle(vector, 5);

circle.draw();
circle.resize(2);
circle.draw();
