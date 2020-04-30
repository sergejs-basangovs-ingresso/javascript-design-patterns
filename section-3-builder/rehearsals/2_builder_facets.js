class Car {
	constructor(make, model) {
		this.make = make;
		this.model = model;
		this.chassis = {};
		this.engine = {};
	}
	print() {
		console.log(JSON.stringify(this, null, 2));
	}
}

class CarBuilder {
	constructor(car = new Car("BMW", "X6")) {
		this.car = car;
	}
	get chassis() {
		return new ChassisBuilder(this.car);
	}

	get engine() {
		return new EngineBuilder(this.car);
	}

	build() {
		return this.car;
	}
}

class ChassisBuilder extends CarBuilder {
	constructor(car) {
		super(car);
	}
	type(type) {
		this.car.chassis.type = type;
		return this;
	}
	mass(ton) {
		this.car.chassis.mass = ton;
		return this;
	}
}

class EngineBuilder extends CarBuilder {
	constructor(car) {
		super(car);
	}
	type(type) {
		this.car.engine.type = type;
		return this;
	}
	fuel(fuel) {
		this.car.engine.fuel = fuel;
		return this;
	}
	volume(volume) {
		this.car.engine.volume = volume;
		return this;
	}
}

const cb = new CarBuilder();
const bmw = cb.engine
	.type("V8")
	.volume(4.1)
	.fuel("petrol")
	.chassis.mass(900)
	.type("Aluminum, Rally")
	.build();

bmw.print();
