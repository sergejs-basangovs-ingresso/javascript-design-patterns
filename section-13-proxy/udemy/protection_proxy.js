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

const car = new CarProxy(new Driver(15));
car.drive();
