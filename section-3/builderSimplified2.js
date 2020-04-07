class Address {
	constructor(zip, street) {
		this.zip = zip;
		this.street = street;
	}
}

class User {
	constructor(name) {
		this.name = name;
	}
}

class UserBuilder {
	constructor(name) {
		this.user = new User(name);
	}

	setAge(age) {
		this.user.age = age;
		return this;
	}

	setPhone(phone) {
		this.user.phone = phone;
		return this;
	}

	setAddress(address) {
		this.user.address = address;
		return this;
	}

	build() {
		return this.user;
	}
}

//usage:

const user = new UserBuilder("Pete").setAge(25).setPhone(12344556).build();
console.log(user);

// builder pattern is to adopt when you have a complex build logic
// But, sometime better way instead to create builder is to use constructor, see builderSimplified3.js
