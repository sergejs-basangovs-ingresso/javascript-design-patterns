class Property {
	constructor(value, name = "") {
		this._value = value;
		this._name = name;
	}

	get value() {
		return this._value;
	}
	set value(newValue) {
		if (this.value === newValue) return;
		console.log(`Assigning ${newValue} to ${this._name}`);
		this._value = newValue;
	}
}

class Creature {
	constructor() {
		this._agility = new Property(10, "agility");
	}

	get agility() {
		return this._agility.value;
	}

	set agility(value) {
		this._agility.value = value;
	}
}

const c = new Creature();

c.agility = 25;
c.agility = 35;
c.agility = 35;
console.log(c.agility);
