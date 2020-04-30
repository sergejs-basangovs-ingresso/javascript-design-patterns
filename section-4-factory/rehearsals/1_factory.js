class HotDrink {
	constructor(...ingredients) {
		this.ingredients = [ingredients];
		this.prepare();
	}
	prepare() {
		console.log("Boiling the water...");
		console.log(`Add ingredients: ${this.ingredients.join(", ")}...`);
		console.log("Pour into cup.");
	}

	consume() {
		throw new error("method must be re-written in sub-class.");
	}
}

class Coffee extends HotDrink {
	constructor() {
		super("coffee", "cream", "sugar");
	}
	consume() {
		console.log("This delicious coffee is great.");
	}
}

class Tea extends HotDrink {
	constructor() {
		super("tea", "ginger", "cinnamon");
	}
	consume() {
		console.log("This tea tastes great with lemon.");
	}
}

class Chocolate extends HotDrink {
	constructor() {
		super("cacao", "vanilla", "cinnamon");
	}
	consume() {
		console.log("This hot chocolate is better served with glass of water.");
	}
}

const Drinks = Object.freeze({
	coffee: Coffee,
	tea: Tea,
	chocolate: Chocolate,
});

class DrinkMachine {
	prepare(drink) {
		if (drink in Drinks) {
			return new Drinks[drink]();
		} else {
			throw new Error(`Unknown drink: '${drink}'`);
		}
	}
}

const machine = new DrinkMachine();
const tea = machine.prepare("chocolate");
tea.consume();
