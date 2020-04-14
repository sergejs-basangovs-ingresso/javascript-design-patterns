// creating objects from prototype:

const john = {
	name: "John",
	phraseOfTheDay: "It is a great day today!",
};

const lena = {
	name: "Lena",
	phraseOfTheDay: "What a beautiful weather is today!",
};
const jenna = Object.create(lena);
console.log(jenna); // new object is empty has no own properties yet : {}
console.log(jenna.name); // but it shows the .name === Lena - which is inherited property

// find the object prototype
const proto = Object.getPrototypeOf(jenna);
console.log("proto === lena =>", proto === lena);

const protoOfLena = Object.getPrototypeOf(lena);
console.log("protoOfLena: ", protoOfLena);

class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

class Employee extends Person {
	constructor(position) {
		super();
		this.position = position;
	}
}

//get prototype class:
const prototypeOfEmployee = Object.getPrototypeOf(Employee);
const worker = new prototypeOfEmployee("John", 42);
console.log("prototypeOfEmployee : ", prototypeOfEmployee);
console.log("worker :", worker);
