class Car {
	constructor() {
		this.make = "Default make";
		this.model = "Default model";
		this.year = this.price = this.fuel_type = this.engine_volume = this.transmission_type = this.transmission_info =
			"No information available";
	}

	toString() {
		return `
      Make: ${this.make}
      Model: ${this.model}
      Year: ${this.year}
      Price: $ ${this.price}
      Fuel: ${this.fuel_type}
      Engine volume: ${this.engine_volume} L
      Transmission : ${this.transmission_type} / ${this.transmission_info}
      `;
	}
}

class CarBuilder {
	constructor(car = new Car()) {
		this.car = car;
	}

	get general() {
		return new CarGeneralInfoBuilder(this.car);
	}

	get engine() {
		return new CarEngineBuilder(this.car);
	}

	get transmission() {
		return new CarTransmissionBuilder(this.car);
	}

	clear() {
		this.car = new Car();
		return this;
	}

	build() {
		return this.car;
	}
}

class CarGeneralInfoBuilder extends CarBuilder {
	constructor(car) {
		super(car);
	}

	make(make) {
		this.car.make = make;
		return this;
	}

	model(model) {
		this.car.model = model;
		return this;
	}

	year(year) {
		this.car.year = year;
		return this;
	}

	price(price) {
		this.car.price = price;
		return this;
	}
}

class CarEngineBuilder extends CarBuilder {
	constructor(car) {
		super(car);
	}

	setEngineVolume(value) {
		this.car.engine_volume = value;
		return this;
	}

	setFuelType(fuel) {
		this.car.fuel_type = fuel;
		return this;
	}
}

class CarTransmissionBuilder extends CarBuilder {
	constructor(car) {
		super(car);
	}

	setType(transmissionType) {
		this.car.transmission_type = transmissionType;
		return this;
	}

	setAdditionalInfo(info) {
		this.car.transmission_info = info;
		return this;
	}
}

const cb = new CarBuilder();
const bmw = cb.general
	.make("BMW")
	.model("M5 sport")
	.year(2020)
	.price(35000)
	.engine.setFuelType("Petrol")
	.setEngineVolume("5.0")
	.transmission.setType("automatic")
	.setAdditionalInfo("Tiptronic sport")
	.build();

console.log(bmw.toString());

const subaru = cb
	.clear()
	.general.make("Subaru")
	.model("Impreza WRX Sport")
	.year(2018)
	.price(19000)
	.engine.setEngineVolume(3.5)
	.setFuelType("Petrol")
	.transmission.setType("Manual")
	.setAdditionalInfo("7 Gear rally")
	.build();

console.log(subaru.toString());
