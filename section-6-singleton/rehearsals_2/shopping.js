class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.id = Math.floor(Date.now() * Math.random());
	}
}

class Basket {
	constructor() {
		if (!Basket.instance) {
			this.basket = [];
			this.purchased = false;
			Basket.instance = this;
		}
		return Basket.instance;
	}

	addItem(item, name = "Someone") {
		console.log(`${name} adding to basket: ${item.name}`);

		this.basket.push(item);
	}
	removeItem(item, name = "Someone") {
		console.log(`${name} removing from basket: ${item.name}`);
		this.basket = this.basket.filter((i) => i.id !== item.id);
	}

	getTotal() {
		return this.basket.reduce((a, b) => (a += b.price), 0);
	}

	seeBasket(name = "Someone") {
		console.log(`Shopper ${name} checking the basket:`);
		for (const item of this.basket) {
			console.log(
				`| ${item.name} | ID: ${item.id} | price: £${item.price} |`
			);
		}
		console.log(`Total: £${this.getTotal()}`);
	}
}

class Shopper {
	constructor(name) {
		this.name = name;
		this.basket = new Basket();
	}

	addToBasket(item) {
		this.basket.addItem(item, this.name);
	}

	removeFromBasket(item) {
		this.basket.removeItem(item, this.name);
	}

	checkBasket() {
		this.basket.seeBasket(this.name);
	}
}

const john = new Shopper("John");
const jane = new Shopper("Jane");

const apples = new Item("apples", 15);
const grapes = new Item("grapes", 25);
const bananas = new Item("bananas", 5);
const wine_1 = new Item("Merlot Rouge", 35);
const wine_2 = new Item("Cabernet Sauvignon", 45);
const cheese = new Item("Camembert", 10);

// John and Jane start shopping together:
john.addToBasket(apples);
jane.addToBasket(grapes);
john.checkBasket();

const annie = new Shopper("Annie");
// Annie is also shopping with Jane and John !
annie.addToBasket(wine_1);
annie.addToBasket(wine_2);
annie.addToBasket(cheese);
jane.checkBasket();
console.log(
	"Jane says: Annie, check the basket - you have got too much of wine !"
);
annie.checkBasket();
console.log("Yes, Jane - I shall remove but just one bottle!");
annie.removeFromBasket(wine_1);
john.checkBasket();
