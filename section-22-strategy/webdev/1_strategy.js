// When we buy a car from a dealer there is a sales and membership system for returning customer
// they are all similar:
class BaseClient {
	calculate(price) {
		return price;
	}
}

class PremiumClient {
	calculate(price) {
		return price * 0.9;
	}
}

class PlatinumClient {
	calculate(price) {
		return price * 0.7;
	}
}

const Strategies = Object.freeze({
	BaseClient: 0,
	PremiumClient: 1,
	PlatinumClient: 2,
});

// then the high level class will just apply these different strategies
class AutoDealer {
	constructor() {
		this._discount = new BaseClient();
		this._price = 0;
	}
	get discount() {
		return this._discount;
	}

	set discount(strategy) {
		switch (strategy) {
			case Strategies.BaseClient:
				this._discount = new BaseClient();
				break;
			case Strategies.PremiumClient:
				this._discount = new PremiumClient();
				break;
			case Strategies.PlatinumClient:
				this._discount = new PlatinumClient();
				break;
			default:
				throw new Error("Unknown discount strategy");
		}
	}

	get price() {
		return this._price;
	}
	set price(amount) {
		this._price = amount;
	}

	makeOffer() {
		return this.discount.calculate(this._price);
	}
}

const dealer = new AutoDealer();
dealer.price = 10000;
console.log(dealer.makeOffer());

dealer.discount = Strategies.BaseClient;
console.log(dealer.makeOffer());
dealer.discount = Strategies.PremiumClient;
console.log(dealer.makeOffer());
dealer.discount = Strategies.PlatinumClient;
console.log(dealer.makeOffer());
