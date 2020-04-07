class Car {
	constructor(make) {
		this.make = make;
		this.model = this.year = this.price = null;
		this.engine = {};
	}

	toString() {
		return `
    Car make: ${this.make}
    Car model: ${this.model}
    Fabrication year: ${this.year}
    Engine: ${this.engine.fuel + " / " + this.engine.volume}
    Price: ${this.price}
    `;
	}
}

class EngineBuilder {
	constructor(fuel, volume) {
		this.fuel = fuel;
		this.volume = volume;
	}
}

class CarBuilder {
	constructor(make) {
		this.car = new Car(make);
		this.make = make;
	}

	setModel(model) {
		this.car.model = model;
		return this;
	}

	setYear(year) {
		this.car.year = year;
		return this;
	}

	setPrice(price) {
		this.car.price = price;
		return this;
	}

	setEngine(fuel, volume) {
		this.car.engine.fuel = fuel;
		this.car.engine.volume = volume;

		return this;
	}

	clear() {
		this.car = new Car(this.make);
		return this;
	}

	build() {
		return this.car;
	}
}

//usage:
const cb = new CarBuilder("BMW");
const bmw = cb
	.setModel("X6")
	.setYear(2020)
	.setPrice(45000)
	.setEngine("Petrol", "4.4")
	.build();

console.log(bmw.toString());

const bmw_2 = cb
	.clear()
	.setModel("M3 sport")
	.setYear(2018)
	.setPrice(30000)
	.setEngine("Petrol", "3.0")
	.build();

console.log(bmw_2.toString());

const bmw_3 = cb.clear().build();
console.log(bmw_3.toString());
