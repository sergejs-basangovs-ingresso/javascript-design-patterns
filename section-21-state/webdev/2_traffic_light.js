// We will take a simple example of a traffic light to understand this pattern.
// The TrafficLight class changes the object it returns based on its internal state,
// which is an object of Red, Yellow, or Green class.

class TrafficLight {
	constructor() {
		this.states = [new RedLight(), new YellowLight(), new GreenLight()];
		this.current = this.states[0];
	}

	change() {
		const statesTotal = this.states.length;
		const currentIndex = this.states.findIndex(
			(item) => item === this.current
		);
		if (currentIndex + 1 < statesTotal) {
			this.current = this.states[currentIndex + 1];
		} else {
			this.current = this.states[0];
		}
	}

	sign() {
		return this.current.sign();
	}
}

class Light {
	constructor(color) {
		this.color = color;
	}
}

class RedLight extends Light {
	constructor() {
		super("red");
	}

	sign() {
		return "STOP";
	}
}

class YellowLight extends Light {
	constructor() {
		super("yellow");
	}

	sign() {
		return "STEADY";
	}
}

class GreenLight extends Light {
	constructor() {
		super("green");
	}

	sign() {
		return "GO";
	}
}

const tl = new TrafficLight();
console.log(tl.sign());
tl.change();
console.log(tl.sign());
tl.change();
console.log(tl.sign());
tl.change();
console.log(tl.sign());
tl.change();
