class Entity {
	constructor(name) {
		this.name = name;
	}
}

const mover = {
	move() {
		console.log(`${this.name} moved.`);
	},
};

const attacker = {
	attack(targetEntity) {
		console.log(
			`${this.name} attacked the ${targetEntity.name} and caused ${this.attackDamage}.`
		);
		targetEntity.takeDamage(this.attackDamage);
	},
};

const hasHealth = {
	takeDamage(amount) {
		this.health -= amount;
		console.log(`${this.name} has ${this.health} health remaining.`);
	},
};

class Character extends Entity {
	constructor(name, attackDamage, health) {
		super(name);
		this.attackDamage = attackDamage;
		this.health = health;
	}
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);

class Wall extends Entity {
	constructor(name, health) {
		super(name);
		this.health = health;
	}
}

Object.assign(Wall.prototype, hasHealth);

class Turret extends Entity {
	constructor(name, attackDamage) {
		super(name);
		this.attackDamage = attackDamage;
	}
}

Object.assign(Turret.prototype, attacker);

const turret = new Turret("Turret", 5);
const character = new Character("Character", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);

console.log("\n Objects own properties: ");

console.log("character:", Object.getOwnPropertyNames(character));
console.log("wall:", Object.getOwnPropertyNames(wall));
console.log("turret:", Object.getOwnPropertyNames(turret));

console.log("\n Objects prototype methods: ");

console.log(
	"character:",
	Object.getOwnPropertyNames(Object.getPrototypeOf(character))
);
console.log("wall:", Object.getOwnPropertyNames(Object.getPrototypeOf(wall)));
console.log(
	"turret:",
	Object.getOwnPropertyNames(Object.getPrototypeOf(turret))
);
