const rl = require("../../utils/utils");

class Event {
	constructor() {
		this.handlers = new Map();
		this.counter = 0;
	}

	subscribe(handler) {
		this.counter++;
		this.handlers.set(this.counter, handler);
		return this.counter;
	}

	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	fire(sender, args) {
		this.handlers.forEach((value, key) => value(sender, args));
	}
}

class Game {
	constructor() {
		this.creatures = new Map();
		this.index = null;

		this.joining = new Event(); //event when creature joins the game
		this.hunting = new Event(); //event when new creature starts hunt
		this.lowDefense = new Event(); // event when creature low defense

		//subscriptions:
		this.huntMonitoring = this.hunting.subscribe((sender, args) => {
			console.log(
				`${args.breed === "goblin" ? "Achtung!!!" : ""} The ${
					args.breed
				} ${args.name} is hunting ...`
			);
		});

		this.defenseMonitoring = this.lowDefense.subscribe((sender, args) => {
			if (args.defense === 0) {
				console.log(`${args.name} is heavily wounded - cannot hunt.`);
			} else if (args.defense < 0) {
				console.log(
					`${args.name} is deadly injured - this warrior is leaving the Hunt.`
				);
				this.remove(args.gamerId);
			}
		});
	}

	add(creature) {
		this.index = Math.floor(Date.now() * Math.random());
		this.creatures.set(this.index, creature);
		console.log(`${creature.name} has joined the game.`);
		return this.index; // return when creature joins game as gamerId reference
	}

	remove(index) {
		this.creatures.delete(index);
	}
}

class HuntEventArgs {
	constructor(creature) {
		this.breed = creature.breed;
		this.name = creature.name;
		this.attack = creature.attack;
		this.defense = creature.defense;
	}
}

class JoinGameArgs {
	constructor(breed, name) {
		this.breed = breed;
		this.name = name;
	}
}

class DefenseStatusArgs {
	constructor(name, defense, gamerId) {
		this.name = name;
		this.defense = defense;
		this.gamerId = gamerId;
	}
}

class Creature {
	constructor(game, breed, name, attack, defense) {
		this.game = game;
		this.breed = breed;
		this.name = name;
		this._attack = attack;
		this._defense = defense;
		this.gamerId = null;
	}

	get defense() {
		return this._defense;
	}

	set defense(value) {
		this._defense = value;
		if (this._defense <= 0) {
			//if low defense - fire event.
			this.game.lowDefense.fire(
				this,
				new DefenseStatusArgs(this.name, this._defense, this.gamerId)
			);
		}
	}

	join() {
		this.gamerId = this.game.add(this);
		this.game.joining.fire(this, new JoinGameArgs(this.breed, this.name));
	}

	hunt() {
		if (!this.gamerId) {
			console.log("Must join the game first");
			return;
		}
		this.game.hunting.fire(this, new HuntEventArgs(this));
	}

	print() {
		console.log(
			`${this.breed} ${this.name} (${this._attack} / ${this._defense} / ${
				this.gamerId ? "playing" : "not playing"
			})`
		);
	}
}

class Monster extends Creature {
	constructor(game, name) {
		super(game, "goblin", name, 20, 30);
	}
}

class Elf extends Creature {
	constructor(game, name) {
		super(game, "elf", name, 17, 20);
	}
}

const game = new Game();
const goblin = new Monster(game, "Johnny");
const elf = new Elf(game, "Tourouwyell");

goblin.join();
elf.join();

goblin.print();
elf.print();

rl.question("Who is going to hunt today ? : ", (answer) => {
	if (answer === "goblin") {
		goblin.hunt();
	} else if (answer === "elf") {
		elf.hunt();
		elf.defense = -10;
		console.log(game);
	} else {
		console.log(
			`The creature: '${answer}' - is not available, or not active.`
		);
	}
	rl.question("Who is attacking ? ", (answer) => {
		console.log(answer, " is attacking...");
		rl.close();
	});
});
