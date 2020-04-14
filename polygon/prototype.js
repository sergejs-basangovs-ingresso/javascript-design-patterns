const arr = [1, 2, 3, 4, 5];
const arr_2 = [4, 5, 6, 12, 24];

function multiplyArray(array, n) {
	return array.map((el) => el * n);
}

console.log(multiplyArray(arr, 2));

// what id I want any arrays of mine have the same method .multiplyArray() ?

Array.prototype.printThis = function () {
	console.log("this: ", this);
};

arr_2.printThis();

Array.prototype.multiplyArray = function (n) {
	return this.map((el) => el * n);
};

console.log(arr_2.multiplyArray(2));

// another example with object:
const john = {
	name: "John",
	phraseOfTheDay: "It is a great day today!",
};

const lena = {
	name: "Lena",
	phraseOfTheDay: "What a beautiful weather is today!",
};

// what if I want to add a method that can use all of my objects?

Object.prototype.sayHello = function (name) {
	console.log(`${this.name} says Hello ${name} ! \n ${this.phraseOfTheDay}`);
};

john.sayHello("Jenna");
lena.sayHello("John");
