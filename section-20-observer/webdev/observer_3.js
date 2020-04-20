class Game {
	constructor() {
		this.creatures = [];
		this.actions = new Map();
		this.count = 0;
	}

	addCreature(creature) {
		this.creatures.push(creature);
	}

	removeCreature(creature) {
		this.creatures = this.creatures.filter(
			(item) => item.id !== creature.id
		);
	}

	addAction(action) {
		this.count++;
		this.actions.set(this.count, action);
		return this.count;
	}

	removeAction(idx) {
		this.actions.delete(idx);
	}

	fireAction(idx) {
		const action = this.actions.get(idx);
		this.creatures.forEach((creature) => {
			action.perform(creature);
		});
	}
}

class Creature {
	constructor(name, attack, defense) {
		this.name = name;
		this.id = Math.floor(Date.now() * Math.random());
		this._attack = attack;
		this._defense = defense;
	}

	get attack() {
		return this._attack;
	}
	get defense() {
		return this._defense;
	}

	set attack(value) {
		this._attack = value;
	}

	set defense(value) {
		this._defense = value;
	}

	print() {
		console.log(`${this.name} (${this.attack}/${this.defense})`);
	}
}

class Action {
	constructor(name) {
		this.name = name;
		this._perform = null;
	}

	get perform() {
		return this._perform;
	}

	set perform(fn) {
		this._perform = fn;
	}
}

const game = new Game();
const goblin = new Creature("Goblin", 1, 1);
const elf = new Creature("Elf", 1, 1);

const greeting = new Action("sayHello");
const attack = new Action("Attack");
const increaseDefense = new Action("Defense Booster");

greeting.perform = function (creature) {
	console.log(`Hi, I am ${creature.name}`);
};

attack.perform = function (creature) {
	console.log(`${creature.name} is attacking!`);
};

increaseDefense.perform = function (creature) {
	console.log(`${creature.name} increased defense x2`);
	creature.defense *= 2;
};

game.addCreature(goblin);
game.addCreature(elf);

const hi = game.addAction(greeting);
const goAttack = game.addAction(attack);
const boostDef = game.addAction(increaseDefense);

game.fireAction(hi);
game.fireAction(goAttack);
game.fireAction(boostDef);
goblin.print();
elf.print();

game.removeCreature(goblin);
game.fireAction(hi);
game.fireAction(goAttack);
game.fireAction(boostDef);
elf.print();
