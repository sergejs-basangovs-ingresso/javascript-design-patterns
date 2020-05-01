class User {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	hasAccess() {
		return this.name === "Bob";
	}
}

class NullUser {
	constructor() {
		this.id = -1;
		this.name = "Guest";
	}
	hasAccess() {
		return false;
	}
}

const users = [new User(1, "Bob"), new User(2, "John")];

function getUser(id) {
	const user = users.find((user) => user.id === id);
	if (user) {
		return user;
	}
	return new NullUser();
}

function printUser(id) {
	const user = getUser(id);
	console.log(`Hello ${user.name}!`);
	if (user.hasAccess()) {
		console.log("You have access.");
	} else {
		console.log("You DON't have access here.");
	}
}

[1, 2, 3].forEach((n) => printUser(n));