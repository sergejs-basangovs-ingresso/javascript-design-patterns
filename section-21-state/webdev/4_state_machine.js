const rl = require("../../utils/utils");

// travel destinations : you can travel between different cities selected from list
const State = Object.freeze({
	London: "London",
	Moscow: "Moscow",
	NewYork: "New York",
	Tokyo: "Tokyo",
	Berlin: "Berlin",
	Paris: "Paris",
});

const Trigger = Object.freeze({
	toLondon: "Flight to London",
	toMoscow: "Flight to Moscow",
	toNY: "Flight to New York",
	toTokyo: "Flight to Tokyo",
	toBerlin: "Flight to Berlin",
	toParis: "Flight to Paris",
});

const rules = {};

rules[State.London] = [
	{ trigger: Trigger.toParis, state: State.Paris },
	{ trigger: Trigger.toNY, state: State.NewYork },
];
rules[State.Paris] = [
	{ trigger: Trigger.toLondon, state: State.London },
	{ trigger: Trigger.toNY, state: State.NewYork },
];

rules[State.NewYork] = [
	{ trigger: Trigger.toTokyo, state: State.Tokyo },
	{ trigger: Trigger.toParis, state: State.Paris },
	{ trigger: Trigger.toMoscow, state: State.Moscow },
];

rules[State.Tokyo] = [
	{ trigger: Trigger.toMoscow, state: State.Moscow },
	{ trigger: Trigger.toLondon, state: State.London },
	{ trigger: Trigger.toBerlin, state: State.Berlin },
];

rules[State.Moscow] = [
	{ trigger: Trigger.toBerlin, state: State.Berlin },
	{ trigger: Trigger.toLondon, state: State.London },
	{ trigger: Trigger.toParis, state: State.Paris },
];

rules[State.Berlin] = [
	{ trigger: Trigger.toNY, state: State.NewYork },
	{ trigger: Trigger.toLondon, state: State.London },
	{ trigger: Trigger.toParis, state: State.Paris },
];

class Travel {
	constructor(from, to) {
		this.location = from;
		this.arrival = to;
	}

	go() {
		const prompt = [
			`You are at the airport in ${this.location}`,
			`Select your next flight number: `,
		];
		for (let i = 0; i < rules[this.location].length; i++) {
			//get trigger
			const t = rules[this.location][i].trigger;
			prompt.push(`${i}. ${t}`);
			//
		}
		prompt.push(" ");

		rl.question(prompt.join("\n"), (answer) => {
			const index = parseInt(answer);
			this.location = rules[this.location][index].state;
			if (this.location !== this.arrival) {
				this.go();
			} else {
				console.log(
					`You have arrived to your final destination: ${this.location}`
				);
				rl.close();
			}
		});
	}
}

const travel = new Travel(State.London, State.Paris);
travel.go();
