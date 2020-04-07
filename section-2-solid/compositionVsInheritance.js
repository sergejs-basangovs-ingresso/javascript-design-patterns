class Monster {
	constructor(name) {
		this.name = name;
	}

	attack() {
		console.log(`${this.name} attacked.`);
	}

	walk() {
		console.log(`${this.name} walked.`);
	}
}

class FlyingMonster extends Monster {
	fly() {
		console.log(`${this.name} flied.`);
	}
}

class SwimmingMonster extends Monster {
	swim() {
		console.log(`${this.name} swam.`);
	}
}

const bear = new Monster("bear");
bear.walk();
bear.attack();

const eagle = new FlyingMonster("eagle");
eagle.walk();
eagle.fly();
eagle.attack();

const shark = new SwimmingMonster("shark");
shark.walk();
shark.swim();
shark.attack();

// BUT what if we want to make a monster that is both flying and swimming ?
// here is difficult to use inheritance - there is another solution - use composition ( see next file compositionVsInheritance2.js)
