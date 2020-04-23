// iterator:
class RangeIterator {
	constructor(start = 0, end = 100, step = 1) {
		this.current = start;
		this.end = end;
		this.step = step;
	}

	next() {
		if (this.current <= this.end) {
			const value = this.current;
			this.current += this.step;
			return {
				value: value,
				done: false,
			};
		} else {
			return {
				value: undefined,
				done: true,
			};
		}
	}

	[Symbol.iterator]() {
		return this;
	}
}

const ri = new RangeIterator(0, 2, 1);

for (const x of ri) {
	console.log(x);
}

// ======= generator ==========

class RangeGenerator {
	constructor(start = 0, end = 100, step = 1) {
		this.current = start;
		this.end = end;
		this.step = step;
	}

	*gen() {
		for (let num = this.current; num <= this.end; num += this.step) {
			yield num;
		}
	}
}

console.log("\n***********************\n");

const rg = new RangeGenerator(0, 2, 1).gen();
for (const x of rg) {
	console.log(x);
}
