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

	deploy(bool) {
		this.deployed = bool;
	}

	status() {
		console.log(
			`| ${this.type} ${this.volume} ${this.id}| ready: ${this.deployed} | loc: ${this.location} |`
		);
	}
}

class ComplexUnit extends BaseUnit {
	constructor(type, volume, units = []) {
		super(type, volume);
		this.units = [...units];
	}

	move(location) {
		this.deploy(false);
		this.units.forEach((u) => u.move(location));
		this.location = location;
	}

	deploy(bool = true) {
		this.units.forEach((u) => u.deploy(bool));
		this.deployed = bool;
	}

	status() {
		super.status();
		this.units.forEach((u) => u.status());
	}

	add(unit) {
		this.units.push(unit);
	}

	remove(unit) {
		this.units = this.units.filter((u) => u.id !== unit.id);
	}
}

const bu_recce = [
	new BaseUnit("reconnaissance", "squad"),
	new BaseUnit("reconnaissance", "squad"),
	new BaseUnit("reconnaissance", "squad"),
];
const bu_inf = [
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
	new BaseUnit("infantry", "section"),
];
const bu_tank = [
	new BaseUnit("cavalry", "M1 Abrams"),
	new BaseUnit("cavalry", "M1 Abrams"),
	new BaseUnit("cavalry", "M1 Abrams"),
];
const bu_art = [
	new BaseUnit("artillery", "155mm Howitzer M1"),
	new BaseUnit("artillery", "155mm Howitzer M1"),
	new BaseUnit("artillery", "155mm Howitzer M1"),
];

const platoon_inf_1 = new ComplexUnit(
	"infantry",
	"platoon",
	bu_inf.slice(0, 3)
);
const platoon_inf_2 = new ComplexUnit(
	"infantry",
	"platoon",
	bu_inf.slice(3, 6)
);
const platoon_inf_3 = new ComplexUnit("infantry", "platoon", bu_inf.slice(6));
const company_inf = new ComplexUnit("infantry", "company", [
	platoon_inf_1,
	platoon_inf_2,
	platoon_inf_3,
	bu_recce[2],
]);

const platoon_cavalry = new ComplexUnit("cavalry", "PLATOON", [
	...bu_tank,
	bu_recce[1],
]);
const art_battery = new ComplexUnit("artillery", "BATTERY", bu_art);

const battalion_combined_arms = new ComplexUnit("COMBINED ARMS", "BATTALION", [
	art_battery,
	platoon_cavalry,
	company_inf,
	bu_recce[0],
]);

battalion_combined_arms.move("Kandahar");
art_battery.deploy(true);
platoon_cavalry.deploy(true);
battalion_combined_arms.status();
