//Objects:
const person = {
	name: "Johnny",
	age: 44,
	job: "Fullstack",
};

const op = new Proxy(person, {
	get(target, prop) {
		console.log(`Getting prop: ${prop}`);
		return target[prop];
	},

	set(target, prop, value) {
		if (prop in target) {
			target[prop] = value;
		} else {
			throw new Error(`No ${prop} field in target.`);
		}
	},

	has(target, prop) {
		return ["age", "name", "job"].includes(prop);
	},

	deleteProperty(target, prop) {
		console.log(`Deleting prop: ${prop}...`);
		delete target[prop];
	},
});

console.log(op);
op.name = "Jack";
// op.lastName // it will throw an error
console.log(op.name);
console.log("name" in op);
console.log("lastName" in op);

delete op.age;
console.log(op);
