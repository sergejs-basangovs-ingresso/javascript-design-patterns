class Car {
	constructor() {
		this.open = false;
		this.started = false;
		this.driving = false;
	}

	unlock() {
		console.log("Car - unlocked.");
		this.open = true;
		return true;
	}

	lock() {
		console.log("Car - locked.");
		this.open = false;
		return true;
	}

	engineStart() {
		if (!this.open) return false;
		console.log("Car - engine started.");
		this.started = true;
		return true;
	}

	engineStop() {
		if (!this.open && !this.started) return false;
		console.log("Car - engine stop.");
		this.started = false;
		return true;
	}

	drive() {
		if (!this.open || !this.started || this.driving) return false;
		console.log("driving...");
		this.driving = true;
		return true;
	}

	stop() {
		if (!this.open || !this.started || !this.driving) return false;
		console.log("Stop driving.");
		this.driving = false;
		return true;
	}
}

const Actions = Object.freeze({
	unlock: 1,
	lock: 2,
	engineStart: 3,
	engineStop: 4,
	drive: 5,
	stop: 6,
});

class CarCommand {
	constructor(car) {
		this.car = car;
		this.succeeded = false;
		this.history = [];
	}

	do(action) {
		switch (action) {
			case Actions.unlock:
				this.car.unlock();
				this.history.push(Actions.unlock);
				break;
			case Actions.lock:
				this.car.lock();
				this.history.push(Actions.lock);
				break;
			case Actions.engineStart:
				this.succeeded = this.car.engineStart();
				if (this.succeeded) this.history.push(Actions.engineStart);
				break;
			case Actions.engineStop:
				this.succeeded = this.car.engineStop();
				if (this.succeeded) this.history.push(Actions.engineStop);
				break;
			case Actions.drive:
				this.succeeded = this.car.drive();
				if (this.succeeded) this.history.push(Actions.drive);
				break;
			case Actions.stop:
				this.succeeded = this.car.stop();
				if (this.succeeded) this.history.push(Actions.stop);
				break;
			default:
				return;
		}
	}

	undo() {
		const actionType = this.history.pop();
		if (!actionType) return;

		switch (actionType) {
			case Actions.unlock:
				this.car.lock();
				break;
			case Actions.lock:
				this.car.unlock();
				break;
			case Actions.engineStart:
				this.car.engineStop();
				break;
			case Actions.engineStop:
				this.car.engineStart();
				break;
			case Actions.drive:
				this.car.stop();
				break;
			case Actions.stop:
				this.car.drive();
				break;
			default:
				return;
		}
	}
}
const car = new Car();
const cmd = new CarCommand(car, Actions.unlock);
cmd.do(Actions.unlock);
cmd.do(Actions.engineStart);
cmd.do(Actions.drive);
cmd.do(Actions.stop);
cmd.do(Actions.engineStop);
cmd.do(Actions.lock);
console.log("history: ", cmd.history);

cmd.undo();
cmd.undo();
cmd.undo();
cmd.undo();
cmd.undo();
cmd.undo();
cmd.undo();
