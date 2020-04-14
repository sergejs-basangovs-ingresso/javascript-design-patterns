//Interface Segregation Principle.
class Animal {
	constructor(name) {
		this.name = name;
	}

	walk() {
		console.log(`${this.name} can walk`);
	}

	swim() {
		console.log(`${this.name} can swim`);
	}

	fly() {
		console.log(`${this.name} can fly`);
	}
}
//here we're breaching the Interface Segregation and Liskov Substitution Principles:
class Dog extends Animal {
	fly() {
		return null;
	}
}
class Eagle extends Animal {
	swim() {
		return null;
	}
}
class Whale extends Animal {
	fly() {
		return null;
	}
	walk() {
		return null;
	}
}

const dog = new Dog("Rex");
const eagle = new Eagle("Flyer");
const whale = new Whale("Big Blue");
dog.walk();
dog.swim();
dog.fly();
eagle.walk();
eagle.swim();
eagle.fly();
whale.walk();
whale.swim();
whale.fly();
