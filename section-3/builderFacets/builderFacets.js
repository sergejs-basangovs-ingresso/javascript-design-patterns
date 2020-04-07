class Person {
	constructor() {
		//address
		this.streetAddress = this.postcode = this.city = "";

		// employment info
		this.companyName = this.position = "";
		this.annualIncome = 0;
	}

	toString() {
		return (
			`Person lives at ${this.streetAddress}, ${this.postcode}, ${this.city}` +
			` and works at ${this.companyName} as ${this.position} and earning ${this.annualIncome}`
		);
	}
}

class PersonBuilder {
	constructor(person = new Person()) {
		this.person = person;
	}

	get lives() {
		return new PersonAddressBuilder(this.person);
	}

	get works() {
		return new PersonJobBuilder(this.person);
	}

	build() {
		return this.person;
	}
}

class PersonJobBuilder extends PersonBuilder {
	constructor(person) {
		super(person);
	}
	at(companyName) {
		this.person.companyName = companyName;
		return this;
	}

	asA(position) {
		this.person.position = position;
		return this;
	}

	earning(annualIncome) {
		this.person.annualIncome = annualIncome;
		return this;
	}
}

class PersonAddressBuilder extends PersonBuilder {
	constructor(person) {
		super(person);
	}

	at(streetAddress) {
		this.person.streetAddress = streetAddress;
		return this;
	}

	withPostcode(postcode) {
		this.person.postcode = postcode;
		return this;
	}

	in(city) {
		this.person.city = city;
		return this;
	}
}

// usage:

const pb = new PersonBuilder();
const person = pb.lives
	.at("4 Biscay Road")
	.withPostcode("W6 8JN")
	.in("London")
	.works.at("Ingresso Group")
	.asA("Engineer")
	.earning(35000)
	.build();

console.log(person.toString());
