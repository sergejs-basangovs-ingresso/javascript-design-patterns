class Person {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}

class PersonFactory {
	constructor() {
		this.counter = 0;
	}
	createPerson(name) {
		const person = new Person(this.counter, name);
		this.counter++;
		return person;
	}
}

const pf = new PersonFactory();
const person = pf.createPerson("John");
const person2 = pf.createPerson("Paul");
const person3 = pf.createPerson("Van-Damme");

console.log(person);
console.log(person2);
console.log(person3);
