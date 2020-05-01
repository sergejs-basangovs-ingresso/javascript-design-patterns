class Detail {
	constructor(name) {
		this.name = name;
		this.assembled = false;
		this.mounted = false;
		this.tested = false;
	}

	assemble() {
		this.assembled = true;
		console.log(`${this.name} assembled.`);

		return this;
	}

	mount() {
		if (this.assembled) {
			this.mounted = true;

			console.log(`${this.name} mounted.`);
		}
		return this;
	}
}

class ChassisBuilder extends Detail {
	constructor(frame = "ladder-type", metal = "steel-aluminum 488") {
		super("chassis");
		this.frame = frame;
		this.metal = metal;
	}

	testChassis() {
		if (this.assembled && this.mounted) {
			this.tested = true;
			console.log(
				`${this.name} ${this.frame} ${this.metal} successfully tested for chassis load balance and X-Ray scanned.`
			);
		}
		return this;
	}
}

class EngineBuilder extends Detail {
	constructor(fuel, volume) {
		super("engine");
		this.fuel = fuel;
		this.volume = volume;
	}

	testEngine() {
		if (this.assembled && this.mounted) {
			this.tested = true;
			console.log(
				`${this.name} ${this.volume}L ${this.fuel} successfully tested in the engine lab. Mounted on Chassis.`
			);
		}
		return this;
	}
}

class ConveyorCarBase {
	constructor(chassis, engine) {
		this.chassis = chassis;
		this.engine = engine;
		this.base = {};
	}

	assembleBase() {
		this.base.chassis = this.chassis.assemble().mount().testChassis();
		this.base.engine = this.engine.assemble().mount().testEngine();
	}
}

const conveyor = new ConveyorCarBase(
	new ChassisBuilder(),
	new EngineBuilder("petrol", 4.4)
);
conveyor.assembleBase();
console.log(conveyor);
