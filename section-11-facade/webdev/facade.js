class Conveyor {
	setChassis() {
		console.log("Chassis set.");
	}
	setEngine() {
		console.log("Engine is set.");
	}
	setSuspension() {
		console.log("Suspension is set.");
	}
	setTransmission() {
		console.log("Transmission is set.");
	}
	setElectrics() {
		console.log("Electrics is set.");
	}
	setSaloon() {
		console.log("Saloon interior is set.");
	}
	setAccessories() {
		console.log("Accessories are set.");
	}
	performTest() {
		console.log("All assembled.");
	}
}

class ConveyorFacade {
	constructor(car) {
		this.car = car;
	}

	assembly() {
		this.car.setChassis();
		this.car.setEngine();
		this.car.setSuspension();
		this.car.setTransmission();
		this.car.setElectrics();
		this.car.setSaloon();
		this.car.setAccessories();
		this.car.performTest();
	}
}

const conveyorFacade = new ConveyorFacade(new Conveyor());
conveyorFacade.assembly();
