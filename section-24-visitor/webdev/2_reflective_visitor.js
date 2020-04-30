class Auto {
	constructor(make, model) {
		this.make = make;
		this.model = model;
	}

	info() {
		return `${this.make} ${this.model}`;
	}
}

class Bmw extends Auto {
	constructor(model) {
		super("BMW", model);
		this.id = `bmw__${this.model}_${Math.floor(
			Date.now() * Math.random()
		)}`;
	}
}

class Tesla extends Auto {
	constructor(model, battery_kWh = 60) {
		super("Tesla", model);
		this.battery_kWh = battery_kWh;
	}
}

class Audi extends Auto {
	constructor(model, edition = "S-Line", hybrid = true) {
		super("Audi", model);
		this.edition = edition;
		this.hybrid = hybrid;
	}
}

class ExportCarInfo {
	export(car, buffer) {
		switch (car.constructor.name) {
			case "Audi":
				buffer.push(
					`${car.make} ${car.model} / Edition: ${car.edition} / ${
						car.hybrid ? "Hybrid" : null
					}`
				);
				break;
			case "Bmw":
				buffer.push(`${car.make} ${car.model} / BMW ID: ${car.id}`);
				break;
			case "Tesla":
				buffer.push(
					`${car.make} ${car.model} / Battery(KWh): ${car.battery_kWh}`
				);
				break;
			default:
				buffer.push(`${car.make} ${car.model}`);
				break;
		}
	}
}

const bmw = new Bmw("X6");
const tesla = new Tesla("S", 100);
const audi = new Audi("Q7", "Sport");
const exportInfo = new ExportCarInfo();
const buffer = [];
exportInfo.export(bmw, buffer);
exportInfo.export(tesla, buffer);
exportInfo.export(audi, buffer);

console.log(buffer.join("\n"));
console.log("audi class: ", audi.constructor.name);
console.log("tesla class: ", tesla.constructor.name);
console.log("bmw class: ", bmw.constructor.name);
