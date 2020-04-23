// Iterators:
// const names = ["jack", "max", "leo"];
// for (const name of names) {
// 	console.log(name);
// }

const generateNumbers = {
	start: 1,
	end: 10,
};

generateNumbers[Symbol.iterator] = function () {
	let current = this.start;
	let last = this.end;

	return {
		next() {
			if (current <= last) {
				return {
					done: false,
					value: current++,
				};
			} else {
				return {
					done: true,
				};
			}
		},
	};
};
console.log(generateNumbers);

for (const number of generateNumbers) {
	console.log(number);
}
