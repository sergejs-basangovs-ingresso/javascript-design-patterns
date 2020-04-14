const car = {
	wheels: 4,
	init() {
		console.log(
			`I am a car with ${this.wheels} wheels and my owner is ${this.owner}`
		);
	},
};

const carWithOwner = Object.create(car, { owner: { value: "Billy Bounce" } });
carWithOwner.init();

console.log(carWithOwner.__proto__ === car);
