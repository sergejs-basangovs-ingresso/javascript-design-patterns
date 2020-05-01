const armouredVeh = Object.freeze({
	us: "M1296 Dragoon",
	uk: "Ares",
	canada: "LAV 6.0",
});

class BaseUnit {
	constructor(type, volume) {
		this.id = Math.floor(Date.now() * Math.random());
		this.type = type;
		this.volume = volume;
		this.deployed = false;
		this.location = null;
	}

	move(location) {
		this.deploy(false);
		this.location = location;
	}

	deploy(bool = true) {
		this.deployed = bool;
	}

	status() {
		console.log(
			`| ${this.type} ${this.volume} ${this.id}| ready: ${this.deployed} | loc: ${this.location} |`
		);
	}
}

class InfantryUnit extends BaseUnit {
	constructor(type, volume) {
		super(type, volume);
		this.entrenched = false;
	}

	entrench(bool = true) {
		this.entrenched = bool;
		this.deploy();
	}
}

class LightArmouredUnit extends BaseUnit {
	constructor(type, volume, vehicleType) {
		super(type, volume);
		this.driving = false;
		this.vehicleType = vehicleType;
		this.sectionOnBoard = null;
		this.location = null;
	}

	embark(section) {
		this.sectionOnBoard = section;
		this.sectionOnBoard.embarked = true;
	}

	disembark() {
		this.sectionOnBoard.embarked = false;
		this.sectionOnBoard = null;
	}

	drive(location) {
		this.location = location;
		if (this.sectionOnBoard) {
			this.sectionOnBoard.location = location;
			this.sectionOnBoard.infantryUnit.location = location;
		}
	}
	status() {
		const onBoard = this.sectionOnBoard
			? `${this.sectionOnBoard.type} ${this.sectionOnBoard.volume}`
			: "not embarked";
		console.log(
			`| ${this.type} ${this.volume} ${this.id}| ready: ${this.deployed} | loc: ${this.location} | section on board: ${onBoard}`
		);
	}
}

class MechanizedUnit extends BaseUnit {
	constructor(type, volume, infantryUnit, vehicleType) {
		super(type, volume);
		this.infantryUnit = infantryUnit;
		this.embarked = false;
		this.vehicle = new LightArmouredUnit(
			"light armor",
			"crew of 3",
			vehicleType
		);
	}

	embarkInfantry() {
		this.vehicle.embark(this);
	}

	disembarkInfantry() {
		this.vehicle.disembark();
	}

	entrenchInfantry() {
		if (this.embarked) {
			console.log("first - disembark infantry, then - entrench.");
			return;
		}

		return this.infantryUnit.entrench();
	}

	drive(location) {
		if (!this.embarked) {
			console.log("Embark unit first.");
			return;
		}
		this.vehicle.drive(location);
	}

	status() {
		const embarked = this.embarked ? "embarked" : "not embarked";
		console.log(
			`| ${this.type} ${this.volume} ${this.id}| ready: ${this.deployed} | loc: ${this.location} | vehicle: ${this.vehicle.vehicleType} - ${embarked} |`
		);
	}
}

const inf_1 = new InfantryUnit("infantry", "section(8)");
const mi = new MechanizedUnit(
	"mechanized infantry",
	"section",
	inf_1,
	armouredVeh.us
);

mi.embarkInfantry();
mi.drive("Masari Sharif");
mi.status();
mi.disembarkInfantry();
mi.entrenchInfantry();
mi.infantryUnit.status();
