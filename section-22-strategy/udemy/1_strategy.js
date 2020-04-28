// lets build a text processor, that can convert text to markup and markdown :
// <ul><li>Hello</li></ul>
// or, markdown:
// * Hello
// * World

const OutputFormat = Object.freeze({
	markdown: 0,
	html: 1,
});

class ListStrategy {
	start(buffer) {}
	end(buffer) {}
	addListItem(buffer, item) {}
}

class MarkdownListStrategy extends ListStrategy {
	addListItem(buffer, item) {
		buffer.push(` * ${item}`);
	}
}

class HtmlListStrategy extends ListStrategy {
	start(buffer) {
		buffer.push("<ul>");
	}
	end(buffer) {
		buffer.push("</ul>");
	}
	addListItem(buffer, item) {
		buffer.push(`  <li>${item}</li>`);
	}
}

class TextProcessor {
	constructor(outputFormat) {
		this.buffer = [];
		this.setOutputFormat(outputFormat);
	}

	setOutputFormat(format) {
		// this method is to switch the strategies:
		switch (format) {
			case OutputFormat.markdown:
				// setting our low-level logic:
				this.listStrategy = new MarkdownListStrategy();
				break;
			case OutputFormat.html:
				// setting our low-level logic:
				this.listStrategy = new HtmlListStrategy();
				break;
			default:
				throw new Error("Output format not specified.");
		}
	}

	appendList(items) {
		// here we just got items to append, hight level logic doesn't know yet what the strategy is: markdown or html
		this.listStrategy.start(this.buffer);
		for (const item of items) {
			// it is all specified within the low-level logic (this.listStrategy , in out case)
			this.listStrategy.addListItem(this.buffer, item);
		}
		this.listStrategy.end(this.buffer);
	}

	// some utility methods, not related to strategy:
	clear() {
		this.buffer = [];
	}

	toString() {
		return this.buffer.join("\n");
	}
}

const tp = new TextProcessor(OutputFormat.markdown);
tp.appendList(["Hello", "World"]);
console.log(tp.toString());
tp.clear();

tp.setOutputFormat(OutputFormat.html);
tp.appendList(["Pony", "Johnny"]);
console.log(tp.toString());
