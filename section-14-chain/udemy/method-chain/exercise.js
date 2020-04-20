class Goblin {
	constructor(game, baseAttack = 1, baseDefense = 1) {
		this.game = game;
		game.creatures.push(this);
		this.baseAttack = baseAttack;
		this.baseDefense = baseDefense;
	}

	handleQuery(creature, query) {
		if (creature === this) {
			if (query.whatToQuery === "attack") {
				query.result += this.baseAttack;
			}
			if (query.whatToQuery === "defense") {
				query.result += this.baseDefense;
			}
		} else if (query.whatToQuery === "defense") {
			query.result++;
		}
	}

	get defense() {
		const q = {
			whatToQuery: "defense",
			result: 0,
		};
		for (const c of this.game.creatures) c.handleQuery(this, q);
		return q.result;
	}

	get attack() {
		const q = {
			whatToQuery: "attack",
			result: 0,
		};

		for (const c of this.game.creatures) c.handleQuery(this, q);
		return q.result;
	}

	toString() {
		return `Goblin: ${this.attack} / ${this.defense}`;
	}
}

class GoblinKing extends Goblin {
	constructor(game) {
		super(game, 3, 3);
	}

	handleQuery(creature, query) {
		if (creature !== this && query.whatToQuery === "attack") {
			//if other than this and query about attack value
			query.result++;
		}
		//then in all cases:
		super.handleQuery(creature, query);
	}
}

class Game {
	constructor() {
		this.creatures = [];
	}
}

const game = new Game();
const goblin = new Goblin(game);
const goblin2 = new Goblin(game);
const goblin3 = new Goblin(game);
const goblinKing = new GoblinKing(game);

console.log(goblin.toString());
console.log(goblin2.toString());
console.log(goblin3.toString());
console.log(goblinKing.toString());
