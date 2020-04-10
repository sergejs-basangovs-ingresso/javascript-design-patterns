const fs = require("fs");
const path = require("path");

class LocalStorage {
	constructor() {
		if (fs.existsSync(path.join(__dirname, "localStorage.json"))) {
			console.log("Loading items from localStorage.json");
			const text = fs.readFileSync(
				path.join(__dirname, "localStorage.json")
			);
			this.items = JSON.parse(text);
		} else {
			this.items = {};
		}
	}

	get length() {
		return Object.keys(this.items).length;
	}

	getItem(name) {
		if (this.items[name]) {
			return this.items[name];
		}
		console.log("No such item.");
	}

	setItem(name, value) {
		this.items[name] = value;
		fs.writeFile(
			path.join(__dirname, "localStorage.json"),
			JSON.stringify(this.items),
			(error) => {
				if (error) {
					console.log("Failed to write: ", error);
				}
			}
		);
	}

	clear() {
		this.items = {};
		fs.unlink(path.join(__dirname, "localStorage.json"), () => {
			console.log("localStorage file removed.");
		});
	}
}

module.exports = new LocalStorage();
