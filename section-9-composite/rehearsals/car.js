class Part {
	constructor(name) {
		this.name = name;
		this.assembled = null;
	}
	assemble() {
		this.assembled = new Date();
	}
}

class CarSection {
	constructor(name, partName) {
		this.name = name;
		this.assembled = null;
		this.sections = [];
		if (partName) this.sections.push(new Part(partName));
	}

	assemble() {
		this.assembled = new Date();
		this.sections.forEach((subSection) => {
			subSection.assemble();
		});
	}

	addSections(...list) {
		list.forEach((item) => {
			this.sections.push(item);
		});
	}
}

class Car {
	constructor(model, make) {
		this.model = model;
		this.make = make;
		this.assembled = null;
		this.sections = [];
	}

	assemble() {
		this.assembled = new Date();
		this.sections.forEach((section) => {
			section.assemble();
		});
	}

	addSections(...list) {
		list.forEach((item) => {
			this.sections.push(item);
		});
	}
}

class CarInfoReader {
	toJson(car) {
		console.log(JSON.stringify(car, null, 2));
	}
}

const reader = new CarInfoReader();
const bmw = new Car("BMW", "X6");

//car sections:
const engine = new CarSection("engine");
const suspension = new CarSection("suspension");
const transmission = new CarSection("transmission");

//car parts:
//engine:
const radiator = new Part("radiator");
const battery = new Part("battery");
const starter = new Part("starter");

const coreEngine = new CarSection("core engine");
const injection = new Part("injection");
const plugs = new Part("plugs");
const valves = new Part("valves");
const pistons = new Part("pistons");
const pump = new Part("pump");

const connections = new CarSection("connections", "pipes");
const hoses = new Part("hoses");
const wiring = new Part("wiring");

engine.addSections(coreEngine, connections, radiator, battery, starter);
coreEngine.addSections(injection, plugs, valves, pistons, pump);
connections.addSections(hoses, wiring);

bmw.addSections(engine);
bmw.addSections(suspension);
bmw.addSections(transmission);
bmw.assemble();

reader.toJson(bmw);
