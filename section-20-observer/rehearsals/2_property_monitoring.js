// goblins if 1 goblin - no bonus points, if more than one joins attack and defense increased by number of goblins in game
// elf - if 1 elf - no bonus points - if more than one elf joins - attack, defense bonuses are increased by random number between 0 and 2*(number of elfs) in game;

class Event {
	constructor() {
		this.handlers = new Map();
	}

	subscribe(handler) {
		const index = Math.floor(Date.now() * Math.random());
		this.handlers.set(index, handler);
		return index;
	}

	unsubscribe(index) {
		this.handlers.delete(index);
	}

	fire(sender, args) {
		this.handlers.forEach((val, key) => val(sender, args));
	}
}

class CreatureJoinedArgs {
	constructor(name, race, bonus) {
		this.name = name;
		this.race = race;
		this.bonus = bonus;
	}
}

const creaturesData = Object.freeze({
	goblin: {
		attack: 20,
		defense: 30,
	},
	elf: {
		attack: 15,
		defense: 25,
	},
});

class Game {
	static data = creaturesData;
	constructor() {
		this.creatures = [];
		this.creatureJoined = new Event();
		this.creatureRemoved = new Event();
	}

	add(creature) {
		this.creatures.push(creature);
		const bonus = this.calculatePerRace(creature.race);
		this.creatureJoined.fire(
			this,
			new CreatureJoinedArgs(creature.name, creature.race, bonus)
		);
	}

	remove(creature) {
		this.resetToInit(creature);
		this.creatures = this.creatures.filter(
			(item) => item.id !== creature.id
		);
		this.creatureRemoved.fire(
			this,
			new CreatureJoinedArgs(
				creature.name,
				creature.race,
				this.calculatePerRace(creature.race)
			)
		);
	}

	resetToInit(creature) {
		creature.attack = Game.data[creature.race].attack;
		creature.defense = Game.data[creature.race].defense;
	}

	calculatePerRace(race) {
		return this.creatures.filter((item) => item.race === race).length;
	}
}

class Creature {
	constructor(game, name, race, attack, defense) {
		this.id = Math.floor(Date.now() * Math.random());
		this.game = game;
		this.name = name;
		this.race = race;
		this._attack = attack;
		this._defense = defense;
	}

	get isPlaying() {
		return this.game.creatures.some((item) => item.id === this.id);
	}

	get attack() {
		return this._attack;
	}

	set attack(value) {
		this._attack = value;
	}

	get defense() {
		return this._defense;
	}

	set defense(value) {
		this._defense = value;
	}

	print() {
		console.log(
			`${this.race} ${this.name} (attack:${this.attack}/defense:${this.defense})`
		);
	}
}

class Goblin extends Creature {
	constructor(game, name) {
		super(
			game,
			name,
			"goblin",
			Game.data.goblin.attack,
			Game.data.goblin.defense
		);
		this.name = name;

		this.game.creatureJoined.subscribe(this.onCreatureJoin.bind(this));
		this.game.creatureRemoved.subscribe(this.onCreatureRemove.bind(this));
	}

	// goblin's handler to respond to joining goblins
	onCreatureJoin(sender, args) {
		if (!this.isPlaying) return;
		if (args.race === "goblin") {
			const bonus = args.bonus > 1 ? args.bonus : 0;
			this.attack = Game.data.goblin.attack + bonus;
			this.defense = Game.data.goblin.defense + bonus;
		} else {
			console.log(
				`From ${this.race} ${this.name}: fuck you ${args.race} !`
			);
		}
	}

	onCreatureRemove(sender, args) {
		if (!this.isPlaying) return;
		if (args.race === "goblin") {
			this.attack--;
			this.defense--;
		} else {
			console.log(
				`From ${this.race} ${this.name}: Well done for ${args.race} !`
			);
		}
	}
}

class Elf extends Creature {
	constructor(game, name) {
		super(game, name, "elf", Game.data.elf.attack, Game.data.elf.defense);
		this.name = name;
		this.game.creatureJoined.subscribe(this.onCreatureJoin.bind(this));
	}

	//elf's handler to respond to joining elfs:
	onCreatureJoin(sender, args) {
		if (this.isPlaying && args.race === "elf") {
			const bonus = Math.floor(2 * args.bonus * Math.random());
			this.attack = Game.data.elf.attack + bonus;
			this.defense = Game.data.elf.defense + bonus;
		}
	}
}

const game = new Game();

const goblin1 = new Goblin(game, "Johnny");
const goblin2 = new Goblin(game, "Baltazar");
const goblin3 = new Goblin(game, "Perdus");

const elf1 = new Elf(game, "Jeksa");
const elf2 = new Elf(game, "Fiksa");
const elf3 = new Elf(game, "Turuwyiell");

console.log("\n1st joining");
game.add(goblin1);
goblin1.print();
goblin2.print();
goblin3.print();

console.log("\n2nd joining");

game.add(goblin2);
goblin1.print();
goblin2.print();
goblin3.print();

console.log("\n1st elf  joining");

game.add(elf1);

console.log("\n3rd joining");
game.add(goblin3);
goblin1.print();
goblin2.print();
goblin3.print();

console.log("\n3rd removed");
game.remove(goblin3);
goblin1.print();
goblin2.print();
goblin3.print();

console.log("\n1st elf  removal");

game.remove(elf1);
