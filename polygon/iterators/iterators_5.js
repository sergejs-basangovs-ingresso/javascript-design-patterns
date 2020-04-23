class OddsGenerator {
	constructor(start = 1, end = 51, step = 1) {
		this.start = start;
		this.end = end;
		this.step = step;
	}
	[Symbol.iterator]() {
		let current = this.start;
		return {
			next: () => {
				if (current <= this.end) {
					if (current % 2 !== 0) {
						const result = { value: current, done: false };
						current += this.step;
						return result;
					} else {
						const result = { value: undefined, done: false };
						current += this.step;
						return result;
					}
				}
				return { value: undefined, done: true };
			},
		};
	}
}

const odds = new OddsGenerator(4, 21, 1);

for (const num of odds) {
	if (num) {
		console.log(num);
	}
}
