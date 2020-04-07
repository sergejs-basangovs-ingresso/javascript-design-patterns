class Store {
	constructor(user) {
		this.stripe = new Stripe(user);
	}

	purchaseBike(quantity) {
		this.stripe.makePayment(200 * quantity * 100);
	}

	purchaseHelmet(quantity) {
		this.stripe.makePayment(15 * quantity * 100);
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

const store = new Store("John");
store.purchaseBike(2);
store.purchaseHelmet(2);

//Now, if we need to change our Store purchase methods from Stripe on to Paypal - then we have to re-implement all purchase methods in our
// Store class because the Paypal payment method is a bit different.
// then, what shall we do if whe need to change back again to Stripe in some time later ?
// here it comes the idea of DEPENDENCY INVERSION - we shall make that our Store class code ( high level) does not depend on the Low level code ( Stripe, paypal etc.); see dependencyInversion2.js
