class EngineBasic {
	basicInterface() {
		console.log("Engine start: tr-tr-tr");
	}
}

class EngineV8 {
	complexInterface() {
		console.log("V8 Engine start: Wroom-Wroom-Wroom!");
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

class Auto {
	startEngine(engine) {
		engine.basicInterface();
	}
}

const myCar = new Auto();
const basicEngine = new EngineBasic();
const advancedV8Engine = new EngineV8();
const engineAdapter = new EngineAdapter(advancedV8Engine);

myCar.startEngine(basicEngine);
myCar.startEngine(engineAdapter);
// myCar.startEngine(advancedV8Engine); // that one will fail
