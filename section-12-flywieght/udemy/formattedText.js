//we got an app that formatting text upper case - lower case and vise versa
class FormatText {
	constructor(plainText) {
		this.plainText = plainText;
		//also we map all letters in text each letter: true-upperCase/ false-lowerCase
		this.caps = new Array(plainText.length).map(() => false);
	}

	capitalize(start, end) {
		for (let i = start; i <= end; i++) {
			this.caps[i] = true; // ** //
		}
	}

	toString() {
		const buffer = [];
		for (let i = 0; i < this.caps.length; i++) {
			let char = this.plainText[i];
			if (this.caps[i]) char = char.toUpperCase();
			buffer.push(char);
		}

		return buffer.join("");
	}
}

// And it will work fine, BUT we are using a lot of memory here ( // ** //). we are actually double the use of memory for the text size
const text = "This is a brave new world";
const text_1 = new FormatText(text);
text_1.capitalize(10, 15);
console.log(text_1.toString());

// here is the flyweight version, using less memory:
// this would work better as a nested class
class TextRange {
	constructor(start, end) {
		this.start = start;
		this.end = end;
		this.capitalize = false;
		// other formatting options here
	}

	covers(position) {
		return position >= this.start && position <= this.end;
	}
}

class BetterFormattedText {
	constructor(plainText) {
		this.plainText = plainText;
		this.formatting = [];
	}

	getRange(start, end) {
		let range = new TextRange(start, end);
		this.formatting.push(range);
		return range;
	}

	toString() {
		let buffer = [];
		for (let i in this.plainText) {
			let c = this.plainText[i];
			for (let range of this.formatting) {
				if (range.covers(i) && range.capitalize) c = c.toUpperCase();
			}
			buffer.push(c);
		}
		return buffer.join("");
	}
}

const bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());
