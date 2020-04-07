class Address {
	constructor(zip, street) {
		this.zip = zip;
		this.street = street;
	}
}

class User {
	constructor(name, age, phone, address) {
		this.name = name;
		this.age = age;
		this.phone = phone;
		this.address = address;
	}
}

// but what if we cannot supply all data?
// we shall find ourselves with the expression like
// const user = new User(name, undefined, undefined, new Address(123, "Main road"))
// better idea is to use the builder pattern: see builderSimplified2.js
