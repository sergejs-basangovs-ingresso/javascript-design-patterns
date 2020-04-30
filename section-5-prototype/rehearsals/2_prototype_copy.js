class Weapon {
	constructor(name, velocity, speed) {
		this.name = name;
		this.velocity = velocity;
		this.speed = speed;
		console.log("some VERY EXPENSIVE Weapon object initialization.");
	}
	clone() {
		const proto = Object.getPrototypeOf(this);
		const clonedWeapon = Object.create(proto);
		clonedWeapon.name = this.name;
		clonedWeapon.velocity = this.velocity;
		clonedWeapon.speed = this.speed;
		return clonedWeapon;
	}
}

class Monster {
	constructor(race, name, weapon, attack, defense) {
		this.race = race;
		this.name = name;
		this.weapon = weapon; // object Weapon
		this.attack = attack;
		this.defense = defense;
		console.log("some VERY EXPENSIVE Monster object initialization.");
	}

	print() {
		console.log(
			`${this.race} ${this.name} (${this.attack} ${this.defense}) / weapon: ${this.weapon.name} (velocity-${this.weapon.velocity} / speed-${this.weapon.speed})`
		);
	}

	clone() {
		const proto = Object.getPrototypeOf(this);
		const clonedMonster = Object.create(proto);
		clonedMonster.race = this.race;
		clonedMonster.attack = this.attack;
		clonedMonster.defense = this.defense;
		clonedMonster.weapon = this.weapon.clone();
		return clonedMonster;
	}
}

const goblin_1 = new Monster(
	"goblin",
	"Johnny",
	new Weapon("sword", 20, 10),
	30,
	20
);

const goblin_2 = goblin_1.clone();
goblin_2.name = "Fitzgerald";
goblin_2.weapon.name = "tomahawk";
goblin_2.weapon.velocity = 15;
goblin_2.weapon.speed = 14;

goblin_1.print();
goblin_2.print();
