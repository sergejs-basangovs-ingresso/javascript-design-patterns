class Transmission {
	constructor(type, gearsNumber) {
		this.type = type;
		this.gearsNumber = gearsNumber;
	}
}

class Engine {
	constructor(fuel, volume) {
		this.fuel = fuel;
		this.volume = volume;
	}
}

class Car {
	constructor(make, model, transmission, engine) {
		// Bridge to : Transmission and to Engine
		this.make = make;
		this.model = model;
		this.transmission = transmission;
		this.engine = engine;
	}

	print() {
		console.log(
			`| ${this.make} | ${this.model} | transmission: ${this.transmission.type}/${this.transmission.gearsNumber} gears | engine: ${this.engine.fuel}/${this.engine.volume}L |`
		);
	}
}

const cars = [
	new Car(
		"BMW",
		"X6",
		new Transmission("auto", 6),
		new Engine("petrol", 4.0)
	),
	new Car(
		"BMW",
		"Z4",
		new Transmission("manual", 7),
		new Engine("petrol", 3.5)
	),
	new Car(
		"Audi",
		"Q6",
		new Transmission("manual", 6),
		new Engine("gpl", 2.5)
	),
	new Car(
		"Audi",
		"S3",
		new Transmission("manual", 7),
		new Engine("petrol", 4.5)
	),
	new Car(
		"Subaru",
		"Impreza GLX",
		new Transmission("manual", 7),
		new Engine("petrol", 3.7)
	),
];

cars.forEach((car) => car.print());
