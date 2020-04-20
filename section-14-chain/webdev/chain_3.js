class Unit {
	constructor() {
		this.next = null;
	}

	attack(target) {
		if (target.health <= 0) return;

		if (this.canAttack(target)) {
			target.health -= this.strength;
			this.strength -= target.defence;
			console.log(`${this.name} attacked the ${target.name}`);
			if (target.health <= 0) {
				console.log(`Unit ${target.name} is destroyed.`);
			}
		} else if (this.next) {
			console.log(`Unit ${this.name} cannot attack the ${target.name}`);
			this.next.attack(target);
		}
		this.status();
	}

	canAttack(target) {
		return (
			this.strength >= target.defence &&
			this.health > 0 &&
			target.health > 0
		);
	}

	setNext(unit) {
		this.next = unit;
	}

	status() {
		if (this.health > 0) {
			console.log(
				`${this.name} (health:${this.health}/defence:${this.defence}/strength:${this.strength})`
			);
		} else {
			console.log(`Unit ${this.name} - is destroyed.`);
		}
	}
}

class Cavalry extends Unit {
	constructor(name) {
		super();
		this.name = name;
		this.health = 100;
		this.strength = 40;
		this.defence = 20;
	}
}

class Infantry extends Unit {
	constructor(name) {
		super();
		this.name = name;
		this.health = 60;
		this.strength = 10;
		this.defence = 40;
	}
}

class Artillery extends Unit {
	constructor(name) {
		super();
		this.name = name;
		this.health = 50;
		this.strength = 150;
		this.defence = 10;
	}
}

const dragoons_1 = new Cavalry("5th Royal Dragoons");
const dragoons_2 = new Cavalry("17th Cuirassiers");
const rifles_1 = new Infantry("2nd Mountain Rifles");
const rifles_2 = new Infantry("1st Rangers");
const rifles_3 = new Infantry("5th Grenadiers");
const mortar_1 = new Artillery("4th Mortars 80mm");

dragoons_1.setNext(dragoons_2);
dragoons_2.setNext(mortar_1);

rifles_1.setNext(rifles_2);
rifles_2.setNext(rifles_3);

console.log("*".repeat(30));
dragoons_1.attack(rifles_1);
dragoons_1.attack(rifles_1);

console.log("*".repeat(30));
dragoons_1.attack(rifles_3);
