// Dependency Inversion Principle
class Fetch {
	request(url) {
		return Promise.resolve(`response data from ${url}`);
	}
}

// now we want to change and retrieve data from the localStorage instead of db:
class LocalStorage {
	get() {
		return "Data from localStorage.";
	}
}

class Database {
	constructor() {
		//and we also have to change fetch to localStorage
		// this.fetch = new Fetch();
		this.LocalStorage = new LocalStorage();
	}

	getData() {
		// return this.fetch.request("https://my-database.com/db_1234");
		return this.LocalStorage.get();
	}
}

const db = new Database();
console.log(db.getData());

//all above is breaching the Dependency Inversion Principle ,that says that low level code should not affect the high level code
// So our Database class should not be affected by changes from Fetch to LocalStorage or other low level logic.
// must use abstraction between them that will deal with the low level logic
