class Tag {
	static get indentSize() {
		return 2;
	}

	static create(name) {
		return new HtmlBuilder(name);
	}

	constructor(name = "", text = "") {
		this.name = name;
		this.text = text;
		this.children = [];
	}

	toStringImpl(indent) {
		const html = [];
		let i = " ".repeat(Tag.indentSize * indent);
		html.push(`${i}<${this.name}>\n`);

		if (this.text.length > 0) {
			html.push(" ".repeat(Tag.indentSize * (indent + 1)));
			html.push(this.text);
			html.push("\n");
		}

		for (const child of this.children) {
			html.push(child.toStringImpl(indent + 1));
		}

		html.push(`${i}</${this.name}>\n`);
		return html.join("");
	}

	toString() {
		return this.toStringImpl(0);
	}
}

//builder
class HtmlBuilder {
	constructor(rootName) {
		this.root = new Tag(rootName);
		this.rootName = rootName;
	}

	addChild(childName, childText) {
		//create a new tag, push it into root tag this.children :
		const child = new Tag(childName, childText);
		this.root.children.push(child);
	}

	addChildFluent(childName, childText) {
		//create a tag, push into this.children, and return this reference to containing object
		const child = new Tag(childName, childText);
		this.root.children.push(child);
		return this;
	}

	toString() {
		return this.root.toString();
	}

	clear() {
		this.root = new Tag(this.rootName);
	}

	build() {
		return this.root;
	}
}

//usage:

const words = ["hello", "world"];

// const builder = new HtmlBuilder("ul");
const builder = Tag.create("ul");
for (const word of words) {
	builder.addChild("li", word);
}
const tag = builder.build();
console.log(tag.toString());

builder.clear();
console.log(builder.toString());

builder
	.addChildFluent("li", "foo")
	.addChildFluent("li", "baz")
	.addChildFluent("li", "bar");
console.log(builder.toString());
