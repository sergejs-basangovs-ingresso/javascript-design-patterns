class Engine {
	constructor(fuel, volume) {
		this.fuel = fuel;
		this.volume = volume;
	}

	get engine() {
		const { fuel, volume } = this;
		return { fuel, volume };
	}
}
class Chassis {
	constructor(type, color) {
		this.type = type;
		this.color = color;
	}
	get chassis() {
		const { type, color } = this;
		return { type, color };
	}
}

class Vehicle {
	constructor(engine, chassis) {
		this.engine = engine;
		this.chassis = chassis;
	}
}

class Car extends Vehicle {
	constructor(engine, chassis, make, model) {
		super(engine, chassis);
		this.make = make;
		this.model = model;
	}

	about() {
		const info = `This ${
			this.chassis.color + " " + this.chassis.type
		} is the best of  ${this.make + " " + this.model} series, running on ${
			this.engine.fuel + " of " + this.engine.volume
		} volume.
    `;
		console.log(info);
	}
}

const engines = {
	petrol: [
		new Engine("petrol", 1.6),
		new Engine("petrol", 1.9),
		new Engine("petrol", 2.0),
		new Engine("petrol", 3.0),
		new Engine("petrol", 3.7),
	],
	diesel: [
		new Engine("diesel", 1.9),
		new Engine("diesel", 2.3),
		new Engine("diesel", 3.0),
	],
	electro: [
		new Engine("electro", "60 kW"),
		new Engine("electro", "100 kW"),
		new Engine("electro", "130 kW"),
	],
};

const chassis = {
	sedan: [
		new Chassis("sedan", "black"),
		new Chassis("sedan", "white"),
		new Chassis("sedan", "blue"),
	],
	hatchback: [
		new Chassis("hatchback", "black"),
		new Chassis("hatchback", "white"),
		new Chassis("hatchback", "blue"),
	],
	suv: [
		new Chassis("SUV", "grey metallic"),
		new Chassis("SUV", "dark ivory"),
		new Chassis("SUV", "blue marine"),
	],
};

const vw_golfs = [
	new Car(engines.petrol[1], chassis.hatchback[2], "Volkswagen", "Golf 5"),
	new Car(engines.petrol[0], chassis.hatchback[1], "Volkswagen", "Golf 5"),
	new Car(engines.petrol[0], chassis.hatchback[0], "Volkswagen", "Golf 5"),
];

const bmw_x6 = [
	new Car(engines.petrol[2], chassis.suv[2], "BMW", "X6"),
	new Car(engines.petrol[3], chassis.suv[1], "BMW", "X6"),
	new Car(engines.petrol[4], chassis.suv[0], "BMW", "X6"),
];

vw_golfs.forEach((vw) => vw.about());
bmw_x6.forEach((bmw) => bmw.about());
