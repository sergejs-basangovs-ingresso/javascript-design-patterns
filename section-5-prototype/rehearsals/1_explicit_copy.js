class Weapon {
	constructor(name, velocity, speed) {
		this.name = name;
		this.velocity = velocity;
		this.speed = speed;
	}

	deepCopy() {
		return new Weapon(this.name, this.velocity, this.speed);
	}
}

class Monster {
	constructor(race, name, weapon, attack, defense) {
		this.race = race;
		this.name = name;
		this.weapon = weapon; // object Weapon
		this.attack = attack;
		this.defense = defense;
		console.log("some VERY EXPENSIVE object initialization.");
	}

	deepCopy() {
		return new Monster(
			this.race,
			this.name,
			this.weapon.deepCopy(),
			this.attack,
			this.defense
		);
	}

	print() {
		console.log(
			`${this.race} ${this.name} (${this.attack} ${this.defense}) / weapon: ${this.weapon.name} (velocity-${this.weapon.velocity} / speed-${this.weapon.speed})`
		);
	}
}

const goblin_1 = new Monster(
	"goblin",
	"Johnny",
	new Weapon("sword", 20, 10),
	30,
	20
);

const goblin_2 = goblin_1.deepCopy();
goblin_2.name = "Fitzgerald";

goblin_1.print();
goblin_2.print();
