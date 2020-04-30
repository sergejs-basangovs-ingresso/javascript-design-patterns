class Vehicle {
	constructor() {
		this.chassis = this.engine = this.suspension = this.transmission = this.electrics = this.accessories = null;
	}
}

class Car extends Vehicle {
	constructor(make, model) {
		super();
		this.make = make;
		this.model = model;
	}
	print() {
		console.log(JSON.stringify(this, null, 2));
	}
}

class CarBuilder {
	constructor(make, model) {
		this.car = new Car(make, model);
	}

	addChassis(chassis) {
		this.car.chassis = chassis;
		return this;
	}

	addEngine(engine) {
		this.car.engine = engine;
		return this;
	}

	addSuspension(suspension) {
		this.car.suspension = suspension;
		return this;
	}

	addTransmission(transmission) {
		this.car.transmission = transmission;
		return this;
	}

	addElectrics(electrics) {
		this.car.electrics = electrics;
		return this;
	}

	addAccessories(accessories) {
		this.car.accessories = accessories;
		return this;
	}

	build() {
		return this.car;
	}
}

const builder = new CarBuilder("BMW", "X6");
const bmw_1 = builder
	.addEngine("V8 Petrol 4.0L")
	.addChassis("bmw sports chassis")
	.addSuspension("composite suspension")
	.addTransmission("automatic tiptronic")
	.addElectrics("bmw shock resistant electrics")
	.addAccessories([
		"navigation",
		"mp3 player",
		"bluetooth",
		"saloon pre-heating",
	])
	.build();
bmw_1.print();

module.exports = Car;
