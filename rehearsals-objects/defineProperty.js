const task = {
	title: "My Title",
	description: "My Task",
	secret: "some info",
	do_not_change: "not reconfigure",
};

//.writable: true/false
Object.defineProperty(task, "toString", {
	value: function () {
		return this.title + " / " + this.description;
	},
	writable: false,
	enumerable: true,
	configurable: true,
});
task.toString = () => "hi!";

//.enumerable: true/false
Object.defineProperty(task, "secret", {
	value: "some very secret info",
	writable: true,
	enumerable: false,
	configurable: true,
});

//.configurable: true/false
Object.defineProperty(task, "do_not_change", {
	value: "this property/value must not be re-configured",
	enumerable: true,
	configurable: false,
});

try {
	Object.defineProperty(task, "do_not_change", {
		value: "this property/value can now be re-configured",
		enumerable: false,
		configurable: true,
	});
} catch (error) {
	console.log("cannot reconfigure this property - task.do_not_change");
}

console.log(task);
console.log(task.secret);

console.log(task.toString());
