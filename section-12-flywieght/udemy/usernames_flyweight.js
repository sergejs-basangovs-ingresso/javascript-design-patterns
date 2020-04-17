class User {
	constructor(fullName) {
		this.fullName = fullName;
	}
}

//flyweight user:
class User2 {
	constructor(fullName) {
		const getOrAdd = (string) => {
			const index = User2.strings.indexOf(string);
			if (index !== -1) {
				return index;
			} else {
				User2.strings.push(string);
				return User2.strings.length - 1;
			}
		};

		// we shall map the locations of first and last name within our names `database`
		// this is just an array of 2 integers showing the index location of the first and last name
		this.names = fullName.split(" ").map(getOrAdd);
	}
}

//our names `database`:
User2.strings = [];

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

const users = [];
//here we store our not-duplicated names :
const users2 = [];

for (const first of firstNames) {
	for (const last of lastNames) {
		users.push(new User(`${first} ${last}`));

		users2.push(new User2(`${first} ${last}`));
	}
}

console.log(
	`10k users will occupy memory approx: ${
		JSON.stringify(users).length
	} characters long`
);

const users2Length = [users2, User2.strings]
	.map((item) => JSON.stringify(item).length)
	.reduce((a, b) => a + b);

console.log(
	`10k users will occupy memory approx: ${users2Length} characters long`
);
