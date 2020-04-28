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

	static carUK() {
		return new Car(cars.uk.currency, cars.uk.mileage);
	}

	static carEU() {
		return new Car(cars.eu.currency, cars.eu.mileage);
	}

	static carUS() {
		return new Car(cars.us.currency, cars.us.mileage);
	}

	static get factory() {
		return new CarFactory();
	}
}

class CarFactory {
	//not necessarily static:
	carUK() {
		return new Car(cars.uk.currency, cars.uk.mileage);
	}

	//can also be static:
	static carEU() {
		return new Car(cars.eu.currency, cars.eu.mileage);
	}

	carUS() {
		return new Car(cars.us.currency, cars.us.mileage);
	}
}

const euroCar = Car.carEU();
const britishCar = Car.carUK();
const americanCar = Car.carUS();

console.log(euroCar);
console.log(britishCar);
console.log(americanCar);

const anotherUkCar = Car.factory.carUK();
const anotherEurCar = CarFactory.carEU();
const anotherUsCar = Car.factory.carUS();

console.log(anotherUkCar);
console.log(anotherEurCar);
console.log(anotherUsCar);
