class Engine {
	constructor(fuel, volume, type) {
		this.fuel = fuel;
		this.volume = volume;
		this.type = type;
	}
}

class Armament {
	constructor(
		cannon = 120,
		hmg = 12.7,
		gpmg = 7.62,
		mortar = null,
		missile = null
	) {
		this.cannon = cannon;
		this.hmg = hmg;
		this.gpmg = gpmg;
		this.mortar = mortar;
		this.missile = missile;
	}
}

class PrintTankInfo {
	constructor(tank) {
		this.tank = tank;
	}

	toString() {
		const info = `
		Model: ${this.tank.model}
		Type: ${this.tank.type}
		Weight: ${this.tank.particulars.weight} ton
		Autonomy: ${this.tank.particulars.autonomy} km
		Engine: ${this.tank.particulars.engine.fuel} / ${this.tank.particulars.engine.volume}L / ${this.tank.particulars.engine.type}
		Cannon: ${this.tank.particulars.armament.cannon} mm
		`;
		console.log(info);
	}

	toJson() {
		console.log(JSON.stringify(this.tank, null, 2));
	}
}

class TankParticulars {
	constructor() {
		this.weight = 60;
		this.crew = 3;
		this.autonomy = 500;
		this.engine = new Engine("diesel", 26.5, "V-12");
		this.armament = new Armament();
	}
}

class Tank {
	constructor(model, type) {
		this.model = model;
		this.type = type;
		this.particulars = new TankParticulars();
	}

	drive() {
		console.log(`${this.model} driving...`);
		return this;
	}

	cannon() {
		console.log(
			`${this.model} firing cal. ${this.particulars.armament.cannon}mm cannon ...`
		);
		return this;
	}

	machineGun(type) {
		const mg =
			type === "hmg"
				? this.particulars.armament.hmg
				: this.particulars.armament.gpmg;
		console.log(`${this.model} firing cal. ${mg}mm machine gun ...`);
		return this;
	}
}

const antiMissileRadar = {
	radar() {
		console.log(`${this.model} detects anti-tank missiles`);
		return this;
	},
};

const antiAircraftMissiles = {
	launchMissileAircraft() {
		console.log(`${this.model} fires anti-aircraft missile...`);
		return this;
	},
};

const landminesScanner = {
	scanLandMines() {
		console.log(`${this.model} scanning ground for landmines...`);
		return this;
	},
};

class Challenger extends Tank {}
class Abrams extends Tank {}

Object.assign(Challenger.prototype, antiMissileRadar);
Object.assign(Abrams.prototype, antiAircraftMissiles, landminesScanner);

const challenger = new Challenger("Challenger", "Main Battle Tank");
const challengerInfo = new PrintTankInfo(challenger);
const abrams = new Abrams("Abrams", "Main Battle Tank");
const abramsInfo = new PrintTankInfo(abrams);

challenger.drive().cannon().machineGun("hmg").radar();
abrams
	.drive()
	.cannon()
	.machineGun("hmg")
	.scanLandMines()
	.launchMissileAircraft();

challengerInfo.toString();
abramsInfo.toString();
