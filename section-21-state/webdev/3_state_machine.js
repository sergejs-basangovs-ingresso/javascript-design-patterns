// traffic regime we need: red->green->yellow

//all possible states:
const State = Object.freeze({
	green: "green",
	yellow: "yellow",
	red: "red",
});

// all possible triggers:
const Trigger = Object.freeze({
	greenToYellow: "green to yellow",
	greenToRed: "green to red",
	yellowToRed: "yellow to red",
	yellowToGreen: "yellow to green",
	redToGreen: "red to green",
	redToYellow: "red to yellow",
});

const rules = {};
//starting from red state initially
rules[State.red] = [
	{ trigger: Trigger.redToGreen, state: State.green },
	{ trigger: Trigger.redToYellow, state: State.yellow },
];
// then green state:
rules[State.green] = [
	{ trigger: Trigger.greenToYellow, state: State.yellow },
	{ trigger: Trigger.greenToRed, state: State.red },
];
// then yellow state :
rules[State.yellow] = [
	{ trigger: Trigger.yellowToRed, state: State.red },
	{ trigger: Trigger.yellowToGreen, state: State.green },
];

class TrafficLight {
	constructor() {
		this.state = State.red;
		this.transitions = [
			Trigger.redToGreen,
			Trigger.greenToYellow,
			Trigger.yellowToRed,
		];
	}

	change() {
		for (const rule of rules[this.state]) {
			if (this.transitions.includes(rule.trigger)) {
				this.state = rule.state;
			}
		}
	}

	print() {
		console.log(`Traffic light: ${this.state}`);
	}
}

const tl = new TrafficLight();
tl.print();
tl.change();
tl.print();
tl.change();
tl.print();
tl.change();
tl.print();
