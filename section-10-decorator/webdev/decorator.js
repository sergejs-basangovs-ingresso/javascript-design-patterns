class Car {
	constructor() {
		this.price = 10000;
		this.model = "Car";
	}

	getPrice() {
		return this.price;
	}

	getDescription() {
		return this.model;
	}
}

class Tesla extends Car {
	constructor() {
		super();
		this.price = 25000;
		this.model = "Tesla";
	}
}

class Autopilot {
	constructor(car) {
		this.car = car;
	}

	getPrice() {
		return this.car.getPrice() + 5000;
	}

	getDescription() {
		return `${this.car.getDescription()} with Autopilot`;
	}
}

class ParkSensors {
	constructor(car) {
		this.car = car;
	}

	getPrice() {
		return this.car.getPrice() + 3000;
	}

	getDescription() {
		return `${this.car.getDescription()} has Parking Sensors`;
	}
}

const tesla = new Tesla();

const teslaAutopilot = new Autopilot(tesla);
const teslaAPPS = new ParkSensors(teslaAutopilot);

console.log("tesla", tesla.getDescription(), " ", tesla.getPrice());
console.log(
	"teslaAutopilot",
	teslaAutopilot.getDescription(),
	" ",
	teslaAutopilot.getPrice()
);
console.log("teslaAPPS", teslaAPPS.getDescription(), " ", teslaAPPS.getPrice());
