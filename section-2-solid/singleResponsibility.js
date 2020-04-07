const fs = require("fs");
const path = require("path");

// single responsibility principle: a class should have a single primary responsibility, as consequence should have just one reason to change:

class Journal {
	constructor() {
		this.entries = {};
	}

	addEntry(text) {
		const c = ++Journal.count;
		const entry = `${c}: ${text}`;
		this.entries[c] = entry;
		return c;
	}

	removeEntry(index) {
		delete this.entries[index];
	}

	toString() {
		return Object.values(this.entries).join("\n");
	}

	// these methods will add secondary responsibility, and better to be removed to other class:

	// save(filename) {
	// 	fs.writeFileSync(filename, this.toString());
	// }

	// load(filename){
	//   // load from file
	// }

	// loadFromUrl(url){
	//   // load from url
	// }
}

class PersistenceManager {
	constructor() {}

	preprocess(j) {
		//preprocess files before save, if needed
	}

	saveToFile(journal, filename) {
		fs.writeFileSync(filename, journal.toString());
	}

	loadFromFile(filename) {
		// load from file
	}

	loadFromUrl(url) {
		// load from url
	}
}

Journal.count = 0;

let j = new Journal();

j.addEntry("What a beautiful day today!");
j.addEntry("I ate a bug.");
console.log(j.toString());

const p = new PersistenceManager();
const filename = path.join(__dirname, "..", "section-2-solid", "journal.txt");
p.saveToFile(j, filename);
