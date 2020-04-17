class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

const PersonProxy = new Proxy(Person, {
	construct(target, args) {
		console.log("Construct...");
		return new target(...args);
	},
});

// const john = new PersonProxy("John", 44);
// console.log(john);

const PersonProxy2 = new Proxy(Person, {
	construct(target, args) {
		console.log("Construct...");
		return new Proxy(new target(...args), {
			get(t, prop) {
				console.log("Getting prop: ", prop);
				return t[prop];
			},
		});
	},
});

const evan = new PersonProxy2("Evan James", 30);
console.log(evan.name);
console.log(evan);
