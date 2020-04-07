class Store {
	constructor(paymentProcessor) {
		this.paymentProcessor = paymentProcessor;
	}

	purchaseBike(quantity) {
		this.paymentProcessor.pay(200 * quantity);
	}

	purchaseHelmet(quantity) {
		this.paymentProcessor.pay(15 * quantity);
	}
}

class StripePaymentProcessor {
	constructor(user) {
		this.stripe = new Stripe(user);
	}
	pay(amountInDollars) {
		this.stripe.makePayment(amountInDollars * 100);
	}
}

class PaypalPaymentProcessor {
	constructor(user) {
		this.paypal = new Paypal();
		this.user = user;
	}

	pay(amountInDollars) {
		this.paypal.makePayment(this.user, amountInDollars);
	}
}

// this class is an imitation of Stripe API:
class Stripe {
	constructor(user) {
		this.user = user;
	}

	makePayment(amountInCents) {
		console.log(
			`${this.user} has made a payment of $${
				amountInCents / 100
			} with Stripe`
		);
	}
}

//this class is an imitation of PayPal API:
class Paypal {
	makePayment(user, amountInDollars) {
		console.log(
			`${user} has made a payment of $${amountInDollars} with PayPal`
		);
	}
}

const store = new Store(new StripePaymentProcessor("John"));
store.purchaseBike(2);
store.purchaseHelmet(2);
