const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class CarAccess {
	open() {
		console.log("Opening the car door...");
	}
	close() {
		console.log("Closing the car door...");
	}
}

class SecuredAccess {
	constructor(car, pw) {
		this.car = car;
		this._pw = pw;
	}

	open() {
		if (this._pw === "secret") {
			console.log("driver is authenticated");
			return this.car.open();
		} else {
			console.log("Access denied.");
		}
	}

	close() {
		return this.car.close();
	}
}

rl.question("Enter password: ", (response) => {
	const securedCar = new SecuredAccess(new CarAccess(), response);
	securedCar.open();
	rl.close();
});
