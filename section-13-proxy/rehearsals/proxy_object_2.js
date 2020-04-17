class Car {
	constructor(make, model) {
		this.make = make;
		this.model = model;
	}
}

const EnhancedCar = new Proxy(Car, {
	construct(target, args) {
		console.log("Construct...");

		//some enhancing logic here..
		return new Proxy(new target(...args), {
			get(target, prop, receiver) {
				console.log(`Getting prop: ${prop}`);
				console.log(`Is prop in receiver ?: ${prop in receiver}`);

				return target[prop];
			},

			set(target, prop, value) {
				console.log(`Assigning to prop: ${prop} value: ${value} `);
				target[prop] = value;
			},
		});
	},
});

const car = new EnhancedCar("audi", "q7");
console.log(car.make, "\n", car.model);
car.model = "q5";
