//making object iterable:
const iterable = {
	name: "My Iterable Stuff",
	[Symbol.iterator]() {
		let step = 0;
		const iterator = {
			next() {
				step++;
				switch (step) {
					case 1:
						return { value: "One", done: false };
					case 2:
						return { value: "Two", done: false };
					case 3:
						return { value: "Three", done: false };
					default:
						return { value: undefined, done: true };
				}
			},
		};
		return iterator;
	},
};

const iterator = iterable[Symbol.iterator]();

for (const item of iterable) {
	console.log(item);
}

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
