class CEO {
	get name() {
		return CEO._name;
	}

	get age() {
		return CEO._age;
	}

	set name(value) {
		CEO._name = value;
	}

	set age(value) {
		CEO._age = value;
	}

	toString() {
		return `The CEO name is ${this.name} and is ${this.age} years old.`;
	}
}

CEO._name = undefined;
CEO._age = undefined;

const ceo_1 = new CEO();
const ceo_2 = new CEO();

ceo_1.name = "John Smith";
ceo_1.age = 35;
console.log(ceo_1.toString());

ceo_2.name = "Tom Jerry";
ceo_2.age = 65;
console.log(ceo_2.toString());
console.log(ceo_1.toString());
