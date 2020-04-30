class Person {
	constructor(name) {
		this.name = name;
	}
}

const person = new Person("John");

console.log(person.constructor.toString()); //  person.constructor === Person
console.log(
	"person.constructor === Person :>> ",
	person.constructor === Person
);

const person2 = new person.constructor("Anastasia");
console.log(person2);
