const fs = require("fs");
const path = require("path");

//low-level module:
class MyDatabase {
	constructor() {
		const instance = this.constructor.instance;
		if (instance) {
			return instance;
		}
		this.constructor.instance = this;
		console.log("Initializing the database.");
		this.capitals = {};
		const lines = fs
			.readFileSync(path.join(__dirname, "capitals.txt"))
			.toString()
			.split("\n");

		for (let i = 0; i < lines.length / 2; i++) {
			this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
		}
	}

	getPopulation(city) {
		return this.capitals[city];
	}
}

class DummyDatabase {
	constructor() {
		this.capitals = {
			alpha: 1,
			bravo: 2,
			charlie: 3,
		};
	}
	getPopulation(city) {
		return this.capitals[city];
	}
}

//high-level module:
class SingletonRecordFinder {
	totalPopulation(cities) {
		return cities
			.map((city) => {
				return new MyDatabase().getPopulation(city);
			})
			.reduce((x, y) => x + y);
	}
}

class ConfigurableRecordFinder {
	constructor(database = new MyDatabase()) {
		this.database = database;
	}
	totalPopulation(cities) {
		return cities
			.map((city) => {
				return this.database.getPopulation(city);
			})
			.reduce((x, y) => x + y);
	}
}

module.exports = {
	MyDatabase,
	DummyDatabase,
	SingletonRecordFinder,
	ConfigurableRecordFinder,
};
