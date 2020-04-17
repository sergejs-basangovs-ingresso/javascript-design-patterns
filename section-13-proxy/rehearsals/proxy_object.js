const axios = require("axios").default;

class Car {
	constructor(make, model, users) {
		this.make = make;
		this.model = model;
		this.users = users;
	}

	printDetails() {
		console.log(JSON.stringify(this, null, 2));
	}
}

const EnhancedCar = new Proxy(Car, {
	construct(target, args) {
		const users = args[2].find((user) => user.id === 10);
		const newArgs = [...args.slice(0, 2), users];

		return new target(...newArgs);
	},
});

axios
	.get("https://jsonplaceholder.typicode.com/posts?userId=1")
	.then((response) => {
		const users = response.data;
		const car = new EnhancedCar("audi", "Q7", users);
		car.printDetails();
	})
	.catch((err) => {
		console.log(err);
	});
