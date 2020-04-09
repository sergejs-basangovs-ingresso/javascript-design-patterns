class Address {
	constructor(street, city, country) {
		this.street = street;
		this.city = city;
		this.country = country;
	}
	deepCopy() {
		return new Address(this.street, this.city, this.country);
	}

	toString() {
		return `${this.street} in ${this.city}, ${this.country}`;
	}
}

class Person {
	constructor(name, address) {
		this.name = name;
		this.address = address;
	}
	deepCopy() {
		return new Person(this.name, this.address.deepCopy());
	}

	toString() {
		return `${this.name} lives at ${this.address}`;
	}

	static toJsonPrint(object) {
		return JSON.stringify(object, null, 2);
	}
}

const john = new Person(
	"John",
	new Address("123 Holland Park Rd", "London", "UK")
);

const jane = john.deepCopy();
jane.name = "Jane";
jane.address.street = "33 Cromwell Crescent";

console.log(john.toString());
console.log(jane.toString());
console.log(Person.toJsonPrint(jane));
