// if you think about graphical app - where you can move and
// rescale the individual shape
// as well as the groups of shapes

class GraphicObject {
	constructor(name = "Group " + GraphicObject.count++) {
		this._name = name;
		this.color = undefined;
		this.children = []; //if it has children it will act as a group of shapes
	}

	get name() {
		return this._name;
	}

	print(buffer = [], depth = 0) {
		buffer.push("*".repeat(depth));
		if (depth > 0) buffer.push(" ");
		if (this.color) buffer.push(this.color + " ");
		buffer.push(this.name);
		buffer.push("\n");

		for (const child of this.children) child.print(buffer, depth + 1);
	}

	toString() {
		const buffer = [];
		this.print(buffer, 0);
		return buffer.join("");
	}
}
GraphicObject.count = 0;

//create single shape types:
class Circle extends GraphicObject {
	constructor(color) {
		super("Circle");
		this.color = color;
	}
}

class Square extends GraphicObject {
	constructor(color) {
		super("Square");
		this.color = color;
	}
}

//creating a group of shapes:
const drawing = new GraphicObject();
drawing.children.push(new Square("red"));
drawing.children.push(new Circle("yellow"));

const group = new GraphicObject();
group.children.push(new Square("green"));
group.children.push(new Circle("magenta"));

drawing.children.push(group);
console.log(drawing.toString());
