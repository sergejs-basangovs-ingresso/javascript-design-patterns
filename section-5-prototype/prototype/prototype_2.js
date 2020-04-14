class Car {
	constructor(make, model) {
		this.make = make;
		this.model = model;
		this.basicFeatures = [];
	}

	getBasicFeatureList() {
		return this.basicFeatures.join(", ");
	}

	addBasic(feature) {
		this.basicFeatures.push(feature);
		return this;
	}

	clone() {
		const proto = Object.getPrototypeOf(this);
		const clonedInstance = Object.create(proto);
		clonedInstance.make = this.make;
		clonedInstance.model = this.model;
		clonedInstance.basicFeatures = [...this.basicFeatures];
		return clonedInstance;
	}
}

const baseModel = new Car("BMW", "X6");
baseModel
	.addBasic("alarm")
	.addBasic("alloy discs")
	.addBasic("rear airbags")
	.addBasic("bluetooth radio/mp3/phone");

const my_car_1 = baseModel.clone();
my_car_1.addBasic("engine compressor");
const my_car_2 = baseModel.clone();

console.log(my_car_1);
console.log(my_car_2);
