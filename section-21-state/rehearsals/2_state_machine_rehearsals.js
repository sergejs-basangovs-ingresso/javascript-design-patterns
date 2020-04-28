const rl = require("../../utils/utils");

//world of tanks:
const State = Object.freeze({
	inside: "inside the tank",
	outside: "out of tank",
	engineOn: "engine running",
	engineOff: "engine off",
	driving: "driving",
	static: "static position",
	targetAcquired: "spotted the target",
	targetEngaged: "hit the target",
	defensive: "in defensive position",
	sitRep: "situation report",
});

const Trigger = Object.freeze({
	startEngine: "pre-heat and start the engine",
	stopEngine: "cut the engine",
	startMovement: "begin the movement",
	goStatic: "stop the tank",
	observe: "observation 360",
	engageTarget: "engage the target",
	takeCover: "post tank behind cover",
	commsOn: "establish radio communication",
	getOut: "open hatch, get out",
});

const rules = {};
rules[State.inside] = [
	{
		trigger: Trigger.startEngine,
		state: State.engineOn,
	},
	{
		trigger: Trigger.getOut,
		state: State.outside,
	},
];

rules[State.engineOn] = [
	{
		trigger: Trigger.startMovement,
		state: State.driving,
	},
	{
		trigger: Trigger.stopEngine,
		state: State.engineOff,
	},

	{
		trigger: Trigger.goStatic,
		state: State.static,
	},
];

rules[State.engineOff] = [
	{
		trigger: Trigger.getOut,
		state: State.outside,
	},
	{
		trigger: Trigger.startEngine,
		state: State.engineOn,
	},
];

rules[State.static] = [
	{
		trigger: Trigger.startMovement,
		state: State.driving,
	},
	{
		trigger: Trigger.observe,
		state: State.targetAcquired,
	},
];

rules[State.driving] = [
	{
		trigger: Trigger.observe,
		state: State.targetAcquired,
	},
	{
		trigger: Trigger.goStatic,
		state: State.static,
	},
];

rules[State.targetAcquired] = [
	{
		trigger: Trigger.engageTarget,
		state: State.targetEngaged,
	},
	{
		trigger: Trigger.takeCover,
		state: State.defensive,
	},
];

rules[State.targetEngaged] = [
	{
		trigger: Trigger.commsOn,
		state: State.sitRep,
	},
	{
		trigger: Trigger.getOut,
		state: State.outside,
	},
];

rules[State.defensive] = [
	{
		trigger: Trigger.commsOn,
		state: State.sitRep,
	},
	{
		trigger: Trigger.getOut,
		state: State.outside,
	},
];

rules[State.sitRep] = [
	{
		trigger: Trigger.startMovement,
		state: State.driving,
	},
	{
		trigger: Trigger.stopEngine,
		state: State.engineOff,
	},
];

let state = State.inside;
const exitState = State.outside;

function runRules() {
	const prompt = [`Your tank status is: ${state}`, `\nWhat is next: `];
	for (let i = 0; i < rules[state].length; i++) {
		const trigger = rules[state][i].trigger;
		prompt.push(`${i}. ${trigger}`);
	}
	prompt.push(" ");

	rl.question(prompt.join("\n"), (answer) => {
		const index = parseInt(answer);
		state = rules[state][index].state; // new state
		// if not exitState:
		if (state !== exitState) {
			runRules();
		} else {
			console.log("Tank manoeuvre is over !");
			rl.close();
		}
	});
}

runRules();
