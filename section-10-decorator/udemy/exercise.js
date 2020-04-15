class Bird {
	constructor(age = 0) {
		this.age = age;
	}

	fly() {
		return this.age < 10 ? "flying" : "too old";
	}
}

class Lizard {
	constructor(age = 0) {
		this.age = age;
	}

	crawl() {
		return this.age > 1 ? "crawling" : "too young";
	}
}

class Dragon {
	constructor(age = 0) {
		// todo
		this._age = age;
		this._bird = new Bird();
		this._lizard = new Lizard();
	}

	set age(value) {
		this._age = this._bird.age = this._lizard.age = value;
	}

	get age() {
		return this._age;
	}

	// todo: API members
	fly() {
		return this._bird.fly();
	}

	crawl() {
		return this._lizard.crawl();
	}
}

const dragon_1 = new Dragon();
dragon_1.age = 5;

console.log(dragon_1.fly());
console.log(dragon_1.crawl());
