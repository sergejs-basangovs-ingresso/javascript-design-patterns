const cars = {
	uk: { currency: "GBP", mileage: "Miles" },
	eu: { currency: "EUR", mileage: "Km" },
	us: { currency: "USD", mileage: "Miles" },
};

class Car {
	constructor(currency, mileage) {
		this.currency = currency;
		this.mileage = mileage;
	}

	static get factory() {
		return new CarFactory();
	}
}

class CarFactory {
	static createUkCar() {
		return new Car(cars.uk.currency, cars.uk.mileage);
	}

	static createEuCar() {
		return new Car(cars.eu.currency, cars.eu.mileage);
	}

	//not necessary to be static:
	createUsCar() {
		return new Car(cars.us.currency, cars.us.mileage);
	}
}

const carUk = CarFactory.createUkCar();
const carEu = CarFactory.createEuCar();
const carUs = new CarFactory().createUsCar();
const anotherUsCar = Car.factory.createUsCar();

console.log(carUk);
console.log(carEu);
console.log(carUs);
console.log(anotherUsCar);
