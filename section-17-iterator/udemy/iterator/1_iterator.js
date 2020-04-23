class Stuff {
	constructor() {
		this.a = 11;
		this.b = 22;
	}
	[Symbol.iterator]() {
		let i = 0;
		let self = this;
		return {
			next: function () {
				return {
					done: i > 1,
					value: self[i++ === 0 ? "a" : "b"],
				};
			},
		};
	}

	get backwards() {
		let i = 0;
		let self = this;
		return {
			next: function () {
				return {
					done: i > 1,
					value: self[i++ === 0 ? "b" : "a"],
				};
			},
			[Symbol.iterator]: function () {
				return this;
			},
		};
	}
}

const stuff = new Stuff();

for (const item of stuff) {
	console.log(item);
}

for (const item of stuff.backwards) {
	console.log(item);
}
