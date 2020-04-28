const rl = require("../../utils/utils");

// a small simulator for the phone call:
// 1. describe possible phone states
const State = Object.freeze({
	offHook: "off hook",
	connecting: "connecting",
	connected: "connected",
	onHold: "on hold",
	onHook: "on hook",
});

// probably here the initial state will start from the offHook
// actually what we're building is a machine that transitions
//2. from one state to another. the thing that moves, actions you from one state to another is called - trigger

const Trigger = Object.freeze({
	callDialled: "dial a number",
	hungUp: "hang up",
	callConnected: "call is connected",
	placedOnHold: "placed on hold",
	takenOffHold: "taken off hold",
	leftMessage: "leave a message",
});

// 3. in order to define these actions above, you need a set of rules:
// the rules are defining the relationships between trigger and state ( trigger => state) or ( if trigger, then state)
const rules = {};
// the key of rules object will be the state we are moving from,
//and the value will be an array of pairs that describe transitions( trigger + state) from one state to another
rules[State.offHook] = [
	{
		trigger: Trigger.callDialled,
		state: State.connecting,
	},
];

rules[State.connecting] = [
	// for example here on connecting you have 2 options: you can either - hang up or get connected
	{
		trigger: Trigger.hungUp,
		state: State.onHook,
	},
	{
		trigger: Trigger.callConnected,
		state: State.connected,
	},
];

rules[State.connected] = [
	// here when connected - you have 3 options:
	{
		trigger: Trigger.leftMessage,
		state: State.onHook,
	},
	{
		trigger: Trigger.hungUp,
		state: State.onHook,
	},
	{
		trigger: Trigger.placedOnHold,
		state: State.onHold,
	},
];

rules[State.onHold] = [
	{
		trigger: Trigger.takenOffHold,
		state: State.connected,
	},
	{
		trigger: Trigger.hungUp,
		state: State.onHook,
	},
];

// 4. after we have defined the rules that triggers everything that needs to happen:
// so now we need actually run the scenario:
// init state:
let state = State.offHook;
const exitState = State.onHook;

const getInput = function () {
	const prompt = [`The phone is currently in ${state}`, `what\'s next: `];

	for (let i = 0; i < rules[state].length; i++) {
		// we'll ge the trigger:
		const t = rules[state][i].trigger;
		prompt.push(`${i}. ${t}`);
	}

	prompt.push(" ");

	rl.question(prompt.join("\n"), (answer) => {
		const input = parseInt(answer); //get the next step in rules
		state = rules[state][input].state; // next state

		// verify if it is an exit state or not:
		if (state !== exitState) {
			getInput();
		} else {
			console.log(`We're done using the phone`);
			rl.close();
		}
	});
};

getInput();
