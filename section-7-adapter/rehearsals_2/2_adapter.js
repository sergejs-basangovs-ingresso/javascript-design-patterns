class Carburetor {
	on() {
		return true;
	}
}

class Starter {
	on() {
		return true;
	}
}

class EngineComputer {
	constructor() {
		this.injection = false;
		this.pressure = false;
		this.charge = 0;
	}

	charging() {
		this.charge = 12;
		return this;
	}
	pressureRaise() {
		this.pressure = true;
		return this;
	}

	injecting() {
		this.injection = true;
		return this;
	}
}

class BasicEngine {
	constructor() {}

	basicInterface(carburetor, starter) {
		const fuel = carburetor.on();
		const momentum = starter.on();
		if (fuel && momentum) {
			console.log("Engine starting: tr-tr-tr...");
		}
	}
}

class EngineV8 {
	complexInterface(computer) {
		computer.charging().pressureRaise().injecting();
		if (computer.charge >= 12 && computer.pressure && computer.injection) {
			console.log("V8 Engine starting: WROOM - WROOM!");
		}
	}
}

class EngineAdapter {
	constructor(engine) {
		this.engine = engine;
	}

	adaptedInterface() {
		if (this.engine instanceof BasicEngine) {
			this.engine.basicInterface(new Carburetor(), new Starter());
		}
		if (this.engine instanceof EngineV8) {
			this.engine.complexInterface(new EngineComputer());
		}
	}
}

class Car {
	constructor(engine) {
		this.engine = engine;
	}

	startEngine() {
		this.engine.adaptedInterface();
	}
}

const eng_1 = new BasicEngine();
const eng_v8 = new EngineV8();
const adapter_1 = new EngineAdapter(eng_1);
const adapter_v8 = new EngineAdapter(eng_v8);

const car_1 = new Car(adapter_1);
const car_2 = new Car(adapter_v8);

car_1.startEngine();
car_2.startEngine();
