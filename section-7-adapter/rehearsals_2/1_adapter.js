class BasicEngine {
	constructor() {
		this.ready = false;
	}

	starter() {
		this.ready = true;
	}

	basicInterface() {
		this.starter();
		if (this.ready) {
			console.log("Engine starting: tr-tr-tr...");
		}
	}
}

class EngineV8 {
	constructor() {
		this.engineComputerOn = false;
	}
	electronicsOn() {
		this.engineComputerOn = true;
	}
	complexInterface() {
		this.electronicsOn();
		if (this.engineComputerOn) {
			console.log("V8 Engine starting: WROOM - WROOM!");
		}
	}
}

class EngineAdapter {
	constructor(engine) {
		this.engine = engine;
	}

	basicInterface() {
		this.engine.complexInterface();
	}
}

class Car {
	constructor(engine) {
		this.engine = engine;
	}

	startEngine() {
		this.engine.basicInterface();
	}
}

const eng_1 = new BasicEngine();
const eng_v8 = new EngineV8();
const adapter = new EngineAdapter(eng_v8);

const car_1 = new Car(eng_1);
const car_2 = new Car(adapter);

car_1.startEngine();
car_2.startEngine();
