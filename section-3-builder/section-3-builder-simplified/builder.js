class Car {
	constructor(make) {
		this.make = make;
		this.accessories = [];
		this.color = "black";
	}

	toString() {
		return JSON.stringify(this, null, 2);
	}
}

class Engine {
	constructor(fuel, volume, type = "") {
		this.fuel = fuel;
		this.volume = volume;
		this.type = type;
	}
}

class Transmission {
	constructor(type = "manual", gears = 5, info = "") {
		this.type = type;
		this.gears = gears;
		this.info = info;
	}
}

class CarBuilder {
	constructor(make) {
		this.make = make;
		this.car = new Car(make);
	}

	setModel(model) {
		this.car.model = model;
		return this;
	}

	setColor(color) {
		this.car.color = color;
		return this;
	}

	setAccessories(...accessories) {
		this.car.accessories.push(...accessories);
		return this;
	}

	setEngine(fuel, volume, type = null) {
		this.car.engine = new Engine(fuel, volume, type);
		return this;
	}

	setTransmission(type, gears, info) {
		this.car.transmission = new Transmission(type, gears, info);
		return this;
	}

	clear() {
		this.car = new Car(this.make);
	}

	build() {
		return this.car;
	}
}

const builder = new CarBuilder("BMW");
const myCar = builder
	.setModel("X6")
	.setColor("red")
	.setEngine("petrol", 3.5, "V8")
	.setTransmission("automatic", 6, "tiptronic/butterfly")
	.setAccessories(
		"seats heating",
		"engine pre-heating",
		"alarm",
		"cruise-control"
	)
	.build();

console.log(myCar.toString());
