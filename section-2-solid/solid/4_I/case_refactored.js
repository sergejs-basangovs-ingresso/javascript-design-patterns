// Interface Segregation Principle

class Animal {
	constructor(name) {
		this.name = name;
	}
}

//create the separate skills objects
const swimmer = {
	swim() {
		console.log(`${this.name} can swim`);
	},
};

const flyer = {
	fly() {
		console.log(`${this.name} can fly`);
	},
};

const walker = {
	walk() {
		console.log(`${this.name} can walk`);
	},
};

class Dog extends Animal {}
class Eagle extends Animal {}
class Whale extends Animal {}

//we shall add the necessary methods to our class object prototype:
Object.assign(Dog.prototype, walker, swimmer);
Object.assign(Eagle.prototype, flyer, walker);
Object.assign(Whale.prototype, swimmer);

const dog = new Dog("Rex");
const eagle = new Eagle("Eagle");
const whale = new Whale("Big Blue");

dog.walk();
dog.swim();
eagle.walk();
eagle.fly();
whale.swim();
