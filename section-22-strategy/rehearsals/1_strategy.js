class Shell {
	constructor(cal, type) {
		this.type = type;
		this.cal = cal;
	}
}

class ExplosiveShell extends Shell {
	constructor(cal) {
		super(cal, "Explosive Shell");
	}
	hit(target) {
		const damage = target.armor > 20 ? 0.1 : 0.3;
		target.health -= damage * this.cal;
		target.armor -= damage * this.cal;
	}
}

class HighExplosiveShell extends Shell {
	constructor(cal) {
		super(cal, " High Explosive Shell");
	}
	hit(target) {
		const damage = target.armor > 25 ? 0.15 : 0.4;
		target.health -= damage * this.cal;
		target.armor -= damage * this.cal;
	}
}

class ArmorPiercingShell extends Shell {
	constructor(cal) {
		super(cal, "Armor Piercing Shell");
	}
	hit(target) {
		let damage = 0;
		if (target.armor <= 5) {
			damage = 0.05;
		} else if (target.armor > 5 && target.armor < 40) {
			damage = 0.8;
		} else {
			damage = 0.5;
		}
		target.health -= damage * this.cal;
		target.armor -= damage * this.cal;
	}
}

class Tank {
	constructor(model, armor, health, calibre) {
		this.model = model;
		this.armor = armor;
		this._health = health;
		this.calibre = calibre;
		this.shellTypes = [
			new ExplosiveShell(this.calibre),
			new HighExplosiveShell(this.calibre),
			new ArmorPiercingShell(this.calibre),
		];
		this.shell = this.shellTypes[0];
	}

	get health() {
		if (this._health < 0) {
			console.log(`${this.model}: hit / Game Over.`);
		}
		return this._health;
	}

	set health(value) {
		this._health = value;
	}

	changeShellType(type) {
		this.shell = this.shellTypes[type];
	}

	fireCannon(target) {
		console.log(
			`${this.model} engaged target : ${target.model} / ammo: ${this.shell.type}`
		);
		this.shell.hit(target);
	}

	status() {
		console.log(
			`${this.model}: (health: ${this.health} / armor: ${this.armor})`
		);
	}
}

Tank.shells = Object.freeze({
	ExplosiveShell: 0,
	HighExplosiveShell: 1,
	ArmorPiercingShell: 2,
});

const t34 = new Tank("T-34", 55, 60, 77);
const tiger = new Tank("Tiger", 120, 60, 88);

t34.fireCannon(tiger);
tiger.status();
tiger.fireCannon(t34);
t34.status();
t34.changeShellType(Tank.shells.ArmorPiercingShell);
t34.fireCannon(tiger);
tiger.status();
tiger.changeShellType(Tank.shells.ArmorPiercingShell);
tiger.fireCannon(t34);
t34.status();
t34.fireCannon(tiger);
tiger.status();
