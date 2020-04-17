class User {
	constructor(fullName) {
		this.fullName = fullName;
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function randomString() {
	const result = [];
	for (let i = 0; i < 10; ++i) {
		result.push(String.fromCharCode(65 + getRandomInt(26)));
	}
	return result.join("");
}

const firstNames = [];
const lastNames = [];

for (let i = 0; i < 100; i++) {
	firstNames.push(randomString());
	lastNames.push(randomString());
}

let users = [];

for (const first of firstNames) {
	for (const last of lastNames) {
		users.push(new User(`${first} ${last}`));
	}
}

console.log(
	`10k users will occupy memory approx: ${
		JSON.stringify(users).length
	} characters long`
);
