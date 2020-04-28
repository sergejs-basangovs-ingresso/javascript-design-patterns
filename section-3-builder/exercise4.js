class Tag {
	static get setIndent() {
		return 2;
	}

	constructor(name = "", text = "", children = []) {
		this.name = name;
		this.text = text;
		this.children = children;
	}

	toStringImpl(indent) {
		const html = [];
		const i = " ".repeat(Tag.setIndent * indent);
		const openTag = `${i}<${this.name}>\n`;
		const closeTag = `${i}<${this.name}>\n`;
		html.push(openTag);
		if (this.text.length > 0) {
			const textIndent = " ".repeat(Tag.setIndent * (indent + 1));
			html.push(`${textIndent + this.text}\n`);
		}
		for (const child of this.children) {
			html.push(child.toStringImpl(indent + 1));
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
		const child = new Tag(childName, text);
		this.rootNode.children.push(child);
	}

	addChildFluent(childName, text) {
		const child = new Tag(childName, text);
		this.rootNode.children.push(child);
		return this;
	}

	clear() {
		this.rootNode = new Tag(this.rootName);
	}

	toString() {
		return this.rootNode.toString();
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
