const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class Car {
	drive() {
		console.log("Car is being driven");
	}
}

class Driver {
	constructor(age) {
		this.age = age;
	}
}

class CarProxy {
	constructor(driver) {
		this.driver = driver;
		this._car = new Car();
	}

	drive() {
		if (this.driver.age > 16) {
			this._car.drive();
		} else {
			console.log("Driver too young.");
		}
	}
}

rl.question("Enter driver's age: ", (answer) => {
	rl.close();
	const age = parseInt(answer);
	const car = new CarProxy(new Driver(age));
	car.drive();
});
