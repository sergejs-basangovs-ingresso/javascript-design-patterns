const task = {
	title: "My Title",
	description: "My Task Description",
};

Object.defineProperty(task, "toString", {
	value: function () {
		return this.title + " / " + this.description;
	},
	writable: false,
	enumerable: false,
	configurable: false,
});

const urgent = Object.create(task);

Object.defineProperty(urgent, "toString", {
	value: function () {
		return this.title + " / " + "urgent";
	},
	writable: false,
	enumerable: false,
	configurable: false,
});

console.log(urgent.toString());
