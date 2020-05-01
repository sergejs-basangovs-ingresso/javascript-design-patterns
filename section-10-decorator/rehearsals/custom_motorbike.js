class Motorbike {
	constructor(engineVol, weight) {
		this.engineVol = engineVol;
		this.weight = weight;
	}

	drive() {
		if (this.weight < 150) {
			console.log("cannot drive - too light.");
			return;
		}
		let drive = "very slow driving...";
		if (this.engineVol >= 900) {
			drive = "driving very fast";
		} else if (this.engineVol > 300 && this.engineVol < 900) {
			drive = "driving more or less";
		}
		console.log(drive);
	}
}

class DeltaPlane {
	constructor(wingSize, weight) {
		this.wingSize = wingSize;
		this.weight = weight;
	}

	fly() {
		if (this.weight > 400) {
			console.log("Cannot fly - too heavy.");
			return;
		}
		console.log("It is flying!");
	}
}

class MotorDeltaPlane {
	constructor(weight, wingSize, engineVol) {
		this._weight = weight;
		this._motor = new Motorbike(engineVol, weight);
		this._deltaPlane = new DeltaPlane(wingSize, (weight = engineVol));
	}

	set weight(value) {
		this._weight = this._motor.weight = this._deltaPlane.weight = value;
	}

	get weight() {
		return this._weight;
	}

	drive() {
		this._motor.drive();
	}

	fly() {
		this._deltaPlane.fly();
	}
}

const mdp = new MotorDeltaPlane(200, 20, 300);
mdp.fly();
mdp.drive();
