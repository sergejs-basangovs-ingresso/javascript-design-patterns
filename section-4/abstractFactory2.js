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

class HotDrinkMachine {
	makeDrink(type) {
		switch (type) {
			case "tea":
				return new TeaFactory().prepare(200);
			case "coffee":
				return new CoffeeFactory().prepare(50);
			default:
				throw new Error("Unknown type of drink.");
		}
	}
}

const machine = new HotDrinkMachine();

rl.question("Which drink? ", (answer) => {
	const drink = machine.makeDrink(answer);
	console.log(drink.consume());
	rl.close();
});
