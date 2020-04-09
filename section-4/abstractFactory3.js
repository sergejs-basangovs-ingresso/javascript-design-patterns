const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class HotDrink {
	consume() {}
}

class Tea extends HotDrink {
	//here we re-write the super method
	consume() {
		console.log("This tea is good with lemon.");
	}
}

class Coffee extends HotDrink {
	//here we re-write the super method
	consume() {
		console.log("This coffee is delicious.");
	}
}

class HotDrinkFactory {
	prepare(amount) {
		//abstract
	}
}

class TeaFactory extends HotDrinkFactory {
	//here we re-write the super method
	prepare(amount) {
		console.log(`Put in tea bag, boil water, pour ${amount}ml.`);
		return new Tea(); // can customize with passing parameters
	}
}

class CoffeeFactory extends HotDrinkFactory {
	//here we re-write the super method
	prepare(amount) {
		console.log(`Grind some beans, boil water, pour ${amount}ml.`);
		return new Coffee(); // can customize with passing parameters
	}
}

const AvailableDrink = Object.freeze({
	tea: TeaFactory,
	coffee: CoffeeFactory,
});

class HotDrinkMachine {
	constructor() {
		this.factories = {};
		for (const drink in AvailableDrink) {
			this.factories[drink] = new AvailableDrink[drink]();
		}
	}

	interact() {
		rl.question("Please, specify the drink (e.g. tea 50): ", (answer) => {
			const [name, amount] = answer.split(" ");
			const d = this.factories[name].prepare(parseInt(amount));
			rl.close();
			d.consume();
		});
	}
}

const machine = new HotDrinkMachine();
machine.interact();
