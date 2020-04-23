class Sequence {
	constructor(start = 0, end = Infinity, step = 1) {
		this.start = start;
		this.end = end;
		this.step = step;
	}

	[Symbol.iterator]() {
		let count = 0;
		let current = this.start;
		return {
			next: () => {
				if (current <= this.end) {
					const result = { value: current, done: false };
					current += this.step;
					count++;
					return result;
				}
				return { value: count, done: true };
			},
		};
	}
}

const evenNumbers = new Sequence(2, 10, 2);

for (const number of evenNumbers) {
	console.log(number);
}
