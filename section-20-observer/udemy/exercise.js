class Event {
	constructor() {
		this.handlers = new Map();
		this.count = 0;
	}

	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		return this.count;
	}

	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	fire(sender, args) {
		this.handlers.forEach((value, key) => value(sender, args));
	}
}

class Game {
	// todo
	constructor() {
		this.rats = new Map();
		this.ratEntersEvent = new Event();
		this.ratDiesEvent = new Event();
		this.ratNotifyEvent = new Event();
	}

	fireRatEnters(sender) {
		this.ratEntersEvent.fire(sender, null);
	}

	fireRatDies(sender) {
		this.ratDiesEvent.fire(sender, null);
	}

	fireRatNotify(sender, whichRat) {
		this.ratNotifyEvent.fire(sender, whichRat);
	}
}

class Rat {
	constructor(game) {
		// todo
		this.game = game;
		this.attack = 1;
		this.game.ratEntersEvent.subscribe(this.ratEntersHandler.bind(this));
		this.game.ratDiesEvent.subscribe(this.ratDiesHandler.bind(this));
		this.game.ratNotifyEvent.subscribe(this.ratNotifyHandler.bind(this));
		game.fireRatEnters(this);
	}

	ratEntersHandler(sender, args) {
		if (sender !== this) {
			this.attack++;
			this.game.fireRatNotify(this, sender);
		}
	}

	ratDiesHandler(sender, args) {
		this.attack--;
	}

	ratNotifyHandler(sender, whichRat) {
		if (whichRat === this) {
			this.attack++;
		}
	}

	die() {
		// todo
		this.game.fireRatDies(this);
	}
}

const game = new Game();
const r1 = new Rat(game);
const r2 = new Rat(game);

console.log("r1: ", r1);
console.log("r2: ", r2);
r2.die();
console.log("r1: ", r1);
console.log("r2: ", r2);
