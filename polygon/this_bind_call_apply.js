function hello() {
	console.log("Hello! ", this);
}

hello();

const person = {
	name: "Some name",
	sayHello: function () {
		console.log(`${this.name} says Hi!`);
	},
	greeting: function (name) {
		console.log(`${this.name} says Hi ${name}!\n ${this.phraseOfTheDay}`);
	},
	phraseOfTheDay: "MY phrase of the day!",
};

const john = {
	name: "John",
	phraseOfTheDay: "It is a great day today!",
};

const lena = {
	name: "Lena",
	phraseOfTheDay: "What a beautiful weather is today!",
};

person.sayHello.bind(john)();
person.sayHello.bind(lena)();
person.greeting.bind(john, "Lena")();
person.greeting.bind(lena, "John")();

person.greeting.call(john, "Lena");
person.greeting.call(lena, "Mormotte");
