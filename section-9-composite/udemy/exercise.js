class SingleValue {
	constructor(value) {
		this.value = value;
	}
}

class ManyValues {
	constructor() {
		this.values = [];
	}
	// ensure there's a push(value) method
	push(value) {
		this.values.push(new SingleValue(value));
	}

	get value() {
		return this.values.reduce((a, b) => a.value + b.value);
	}
}

let sum = function (containers) {
	// todo
	return containers.reduce((a, b) => a.value + b.value);
};

const singleValue = new SingleValue(11);
const otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);
const sum_1 = sum([singleValue, otherValues]);
console.log(sum_1);
