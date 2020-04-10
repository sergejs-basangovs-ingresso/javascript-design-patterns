const fs = require("fs");

class MyDatabase {
	constructor() {
		const instance = this.constructor.instance;
		if (instance) {
			return instance;
		}
		this.constructor.instance = this;
		console.log("Initializing the database.");
	}
}
