// this is a classical theoretical state example, as per gang of 4,
// has a good classical study value, but not really used in
// real life examples:

class Switch {
	constructor() {
		this.state = new OffState();
	}

	on() {
		this.state.on(this);
	}

	off() {
		this.state.off(this);
	}
}

class State {
	constructor() {
		if (this.constructor === State) {
			throw new Error("Abstract class!");
		}
	}

	on(sw) {
		console.log("the light is already on.");
	}

	off(sw) {
		console.log("the light is already off.");
	}
}

class OnState extends State {
	constructor() {
		super();
		console.log("The light is turned on.");
	}

	off(sw) {
		console.log("turning the light off...");
		sw.state = new OffState();
	}
}

class OffState extends State {
	constructor() {
		super();
		console.log("The light is turned off.");
	}

	on(sw) {
		console.log("turning the light on...");
		sw.state = new OnState();
	}
}

const sw = new Switch();
sw.on();
sw.off();
sw.off();
