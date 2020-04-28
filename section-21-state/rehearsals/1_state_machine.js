const rl = require("../../utils/utils");

// possible states in the shop:
const State = Object.freeze({
	inShop: "inside the shop",
	outOfShop: "out of the shop",
	selection: "items selection",
	purchasing: "purchasing",
	purchased: "purchased",
});

// triggers:
const Trigger = Object.freeze({
	toExit: "go to exit",
	toSelect: "selecting items",
	toDeselect: "deselect cancel items",
	completePurchase: "pay with credit card",
});

// rules:
const rules = {};
rules[State.inShop] = [
	{
		trigger: Trigger.toExit,
		state: State.outOfShop,
	},
	{
		trigger: Trigger.toSelect,
		state: State.purchasing,
	},
];

rules[State.purchasing] = [
	{
		trigger: Trigger.completePurchase,
		state: State.purchased,
	},
	{
		trigger: Trigger.toDeselect,
		state: State.inShop,
	},
];

rules[State.purchased] = [
	{
		trigger: Trigger.toExit,
		state: State.outOfShop,
	},
	{
		trigger: Trigger.toSelect,
		state: State.selection,
	},
];

//init state:
let state = State.inShop;
//exit state:
const exitState = State.outOfShop;

function runShoppingRule() {
	const prompt = [`Your current status is : ${state}.`, `\nWhat's next: `];
	for (let i = 0; i < rules[state].length; i++) {
		const trigger = rules[state][i].trigger;
		prompt.push(`${i}. ${trigger}`);
	}
	prompt.push(" ");

	rl.question(prompt.join("\n"), (answer) => {
		const index = parseInt(answer);
		//set a new state:
		state = rules[state][index].state;

		// verify if exitState:
		if (state !== exitState) {
			// re-run the rule with new state:
			runShoppingRule();
		} else {
			console.log("We're done shopping");
			rl.close();
		}
	});
}

runShoppingRule();
