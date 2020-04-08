class Tag {
	static get indentSize() {
		return 2;
	}

	constructor(name = "", text = "", children = []) {
		this.name = name;
		this.text = text;
		this.children = children;
	}

	toStringImpl(indent) {
		const html = [];
		let i = " ".repeat(Tag.indentSize * indent);
		const openTag = `${i}<${this.name}>\n`;
		const closeTag = `${i}</${this.name}>\n`;
		html.push(openTag);
		if (this.text.length > 0) {
			const textIndent = " ".repeat(Tag.indentSize * (indent + 1));
			html.push(`${textIndent + this.text}\n`);
		}
		for (const child of this.children) {
			html.push(child.toStringImpl(indent + 1)); // each child is created with Tag class
		}
		html.push(closeTag);
		return html.join("");
	}

	toString() {
		return this.toStringImpl(0);
	}
}

class HtmlNodeBuilder {
	constructor(rootName) {
		this.rootNode = new Tag(rootName);
		this.rootName = rootName;
	}

	addChild(childName, text) {
		const childNode = new Tag(childName, text);
		this.rootNode.children.push(childNode);
	}

	addChildFluent(childName, text) {
		const childNode = new Tag(childName, text);
		this.rootNode.children.push(childNode);
		return this;
	}

	toString() {
		return this.rootNode.toString();
	}

	clear() {
		this.rootNode = new Tag(this.rootName);
	}

	build() {
		return this.rootNode;
	}
}

const nb = new HtmlNodeBuilder("ul");
const list = nb
	.addChildFluent("li", "One")
	.addChildFluent("li", "Two")
	.addChildFluent("li", "Three")
	.build();
console.log(list.toString());
