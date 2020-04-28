class Car {
	constructor(make, model, year, mileage, price) {
		this.make = make;
		this.model = model;
		this.year = year;
		this.mileage = mileage;
		this.price = price;
		this.units = ["Miles", "£"];
	}

	setUnits(distance, currency) {
		this.units = [distance, currency];
	}

	toString() {
		return JSON.stringify(this, null, 2);
	}
}

class CarSuvFactory {
	createBmw(country) {
		switch (country.toLowerCase()) {
			case "uk":
				return new Car("bmw", "X6", 2020, 20000, 30000);
			case "us":
				const car_us = new Car("bmw", "X6", 2020, 20000, 30000 * 1.4);
				car_us.setUnits("Miles", "$");
				return car_us;
			case "eu":
				const car_eu = new Car(
					"bmw",
					"X6",
					2020,
					20000 * 1.6,
					30000 * 1.1
				);
				car_eu.setUnits("Km", "eur");
				return car_eu;
			default:
				return new Car("bmw", "X6", 2020, 20000, 30000);
		}
	}

	createAudi(country) {
		switch (country.toLowerCase()) {
			case "uk":
				return new Car("audi", "Q7", 2020, 20000, 30000);
			case "us":
				const car_us = new Car("audi", "Q7", 2020, 20000, 30000 * 1.4);
				car_us.setUnits("Miles", "$");
				return car_us;
			case "eu":
				const car_eu = new Car(
					"audi",
					"Q7",
					2020,
					20000 * 1.6,
					30000 * 1.1
				);
				car_eu.setUnits("Km", "eur");
				return car_eu;
			default:
				return new Car("audi", "Q7", 2020, 20000, 30000);
		}
	}
}

const factory = new CarSuvFactory();
const bmw_uk = factory.createBmw("uk");
const bmw_us = factory.createBmw("us");
const bmw_eu = factory.createBmw("Eu");

console.log(bmw_uk.toString());
console.log(bmw_us.toString());
console.log(bmw_eu.toString());

const audi_eu = factory.createAudi("EU");
console.log(audi_eu.toString());
