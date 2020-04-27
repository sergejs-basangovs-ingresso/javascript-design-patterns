class Game {
	// todo
	constructor() {
		this.rats = [];
	}

	addRat(rat) {
		this.rats.push(rat);
	}

	removeRat(rat) {
		this.rats = this.rats.filter((item) => item.id !== rat.id);
	}
}

class Rat {
	constructor(game) {
		// todo
		this.game = game;
		this._attack = 1;
		this.id = Math.floor(Date.now() * Math.random());
		this.game.addRat(this);
	}

	get attack() {
		if (!this.game.rats.some((item) => item.id === this.id)) return;
		if (this.game.rats.length === 0) {
			return this._attack;
		}
		return this.game.rats.length;
	}

	die() {
		// todo
		this.game.removeRat(this);
	}
}

const game = new Game();
const r1 = new Rat(game);
const r2 = new Rat(game);

console.log("r1: ", r1.attack);
console.log("r2: ", r2.attack);
r2.die();
console.log("r1: ", r1.attack);
console.log("r2: ", r2.attack);
