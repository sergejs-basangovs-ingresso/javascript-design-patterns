class User {
	constructor(fullName) {
		this.fullName = fullName;
	}
}

class User2 {
	static cache = [];

	constructor(fullName) {
		const names = fullName.split(" ");
		this.names_indexes = names.map((name) => {
			const idx = User2.cache.indexOf(name);
			if (idx !== -1) {
				return idx;
			} else {
				User2.cache.push(name);
				return User2.cache.length - 1;
			}
		});
	}
	get first_name() {
		return User2.cache[this.names_indexes[0]];
	}
	get last_name() {
		return User2.cache[this.names_indexes[1]];
	}
}

const userList = createNames10k(); // list of 10k users full names
const users1 = userList.map((fullName) => new User(fullName)); // list with 10k users created
const users2 = userList.map((userName) => new User2(userName)); // list with 10k users created with cached values

//calculate data usage:
const users1Length = JSON.stringify(users1).length;
const users2Length = JSON.stringify(users2.concat(User2.cache)).length;

console.group("\nAs example, we create 10,000 users:\n");

console.log(JSON.stringify(users1[0]));
console.log(JSON.stringify(users2[0]));

console.log("users1Length :", users1Length);
console.log("users2Length :", users2Length);

console.log(
	`Normal creation pattern occupies memory size of ${users1Length} characters.`
);
console.log(
	`Flyweight creation pattern occupies memory size of ${users2Length} characters.\n`
);

console.groupEnd();

//========= service functions ==================/////////
function generateRandomName(length) {
	const result = [];
	const lettersInAlphabet = 26;
	for (let i = 0; i < length; i++) {
		const randomInt = Math.floor(Math.random() * lettersInAlphabet);
		result.push(String.fromCharCode(65 + randomInt));
	}

	return result.join("");
}

function createNames10k() {
	const fnames_100 = [];
	const lnames_100 = [];
	const names_10k = [];

	for (let i = 0; i < 100; i++) {
		const fname = generateRandomName(5);
		fnames_100.push(fname);
	}
	for (let i = 0; i < 100; i++) {
		const lname = generateRandomName(15);
		lnames_100.push(lname);
	}

	for (const first of fnames_100) {
		for (const last of lnames_100) {
			names_10k.push(`${first} ${last}`);
		}
	}
	return names_10k;
}
