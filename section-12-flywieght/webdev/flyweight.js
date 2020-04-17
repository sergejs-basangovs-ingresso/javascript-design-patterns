// here is the class that will be used as a lightweight, will be cached.
class Auto {
	constructor(model) {
		this.model = model;
	}
}

// here we have factory that will cache new auto or if auto exists will return existing auto:
class AutoFactory {
	constructor() {
		this.models = {};
	}

	create(model) {
		if (this.models[model]) {
			return this.models[model];
		}
		console.count("new model created");
		this.models[model] = new Auto(model);
		return this.models[model];
	}

	getModels() {
		console.table(this.models);
	}
}

const af = new AutoFactory();
const car_1 = af.create("audi a4");
const car_2 = af.create("audi a4");
const car_3 = af.create("audi a3");
af.getModels();

console.log("car_1 :", car_1);
console.log("car_2 :", car_2);
console.log("car_3 :", car_3);
