class Event {
	constructor() {
		this.handlers = new Map();
		this.counter = 0;
	}

	subscribe(handler) {
		this.handlers.set(++this.counter, handler);
		return this.counter;
	}

	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	fire(sender, args) {
		this.handlers.forEach((value, key) => {
			value(sender, args);
		});
	}
}

class Game {
	constructor() {
		this.events = new Event();
	}
}

class TankDrivingEvent {
	constructor(tank) {
		this.tank = tank;
	}
	print() {
		console.log(`Tank ${this.tank.make} is moving forward...`);
	}
}

class FireCannonEvent {
	constructor(target, firingUnit) {
		this.target = target;
		this.firingUnit = firingUnit;
	}
	print() {
		console.log(
			`${this.firingUnit.make} fired cannon to ${this.target.make}`
		);
	}
}

class Unit {
	constructor(game, make, calibre, armor) {
		this.game = game;
		this.make = make;
		this.calibre = calibre;
		this.armor = armor;
	}
	stats() {
		console.log(
			`${this.make}: (armor: ${this.armor} / ammo: ${this.ammo})`
		);
	}
}

class Tank extends Unit {
	constructor(game, make, calibre, armor) {
		super(game, make, calibre, armor);
		this.ammo = 50;
	}

	drive() {
		const args = new TankDrivingEvent(this);
		args.print();
		this.game.events.fire(this, args);
	}

	fireCannon(target) {
		const args = new FireCannonEvent(target, this);
		args.print();
		this.ammo--;
		this.game.events.fire(this, args);
	}

	takeDamage(calibre) {
		if (calibre < 40) {
			this.armor -= 10;
		} else if (calibre >= 40) {
			this.armor -= 30;
		}
		this.stats();
	}
}

class AntiTankArtillery extends Unit {
	constructor(game, make, calibre, armor) {
		super(game, make, calibre, armor);
		this.ammo = 60;
		this.observationIdx = null;
	}

	observation() {
		this.observationIdx = game.events.subscribe((sender, args) => {
			//check if target is moving, if tank is moving - fire !:
			if (args instanceof TankDrivingEvent) {
				this.fireCannon(args.tank, this);
				args.tank.takeDamage(this.calibre);
			}
		});
	}

	fireCannon(target) {
		const args = new FireCannonEvent(target, this);
		args.print();
		this.ammo--;
		this.game.events.fire(this, args);
		this.stats();
	}

	takeDamage(calibre) {
		if (calibre < 10) {
			this.armor -= 5;
		} else {
			this.armor -= 10;
		}
		this.stats();
	}
}

const game = new Game();
const t34 = new Tank(game, "T-34", 76.2, 47);
const flak = new AntiTankArtillery(game, "FLAK", 88, 8);

flak.observation();
t34.drive();
