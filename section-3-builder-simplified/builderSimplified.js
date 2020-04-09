//our base car model doesn't have such features: auto pilot, park sensors, alarm signal
// but we want to be able to add these features conditionally
//depending on the model release

class Car {
	constructor() {
		this.autoPilot = false;
		this.parktronic = false;
		this.signalling = false;
	}
}

// Builder class:
class CarBuilder {
	constructor() {
		this.car = new Car();
	}

	addAutoPilot(autoPilot) {
		this.car.autoPilot = autoPilot;
		return this;
	}

	addParktronic(parktronic) {
		this.car.parktronic = parktronic;
		return this;
	}

	addSignalling(signalling) {
		this.car.signalling = signalling;
		return this;
	}

	updateEngine(engine) {
		this.car.engine = engine;
		return this;
	}

	clear() {
		this.car = new Car();
		return this;
	}

	build() {
		return this.car;
	}
}

const builder = new CarBuilder();

const myCar = builder
	.addParktronic(true)
	.addAutoPilot(true)
	.addSignalling(true)
	.updateEngine("V8")
	.build();

const baseCar = builder.clear().build();

console.log(baseCar);
console.log(myCar);
