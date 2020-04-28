class Address {
	constructor(zip, street) {
		this.zip = zip;
		this.street = street;
	}
}
//here it says that the 2nd optional argument will have such properties as: age, phone, address
// and if there is no 2nd argument - just pass an empty object
class User {
	constructor(name, { age, phone = 123344567890, address } = {}) {
		this.name = name;
		this.age = age;
		this.phone = phone;
		this.address = address;
	}
}

const user = new User("Bob", {
	age: 20,
	address: new Address("w68jn", "Chesterfield rd"),
	phone: 07896977959,
});
console.log(user);
