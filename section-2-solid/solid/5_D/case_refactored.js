// Dependency Inversion Principle
class Fetch {
	request(url) {
		return Promise.resolve(`response data from ${url}`);
	}
}

class LocalStorage {
	get(key) {
		return `Data from localStorage : ${key}`;
	}
}

class FetchClient {
	constructor() {
		this.fetch = new Fetch();
	}
	clientGet(key) {
		return this.fetch.request(`https://my-db.com/${key}`);
	}
}

class LocalStorageClient {
	constructor() {
		this.localStorage = new LocalStorage();
	}

	clientGet(key) {
		return this.localStorage.get(key);
	}
}

class Database {
	constructor(client) {
		this.client = client;
	}

	getData(key) {
		return this.client.clientGet(key);
	}
}

const db_1 = new Database(new FetchClient());
const db_2 = new Database(new LocalStorageClient());

console.log(db_1.getData("db_1214"));
console.log(db_2.getData("db_1214"));
