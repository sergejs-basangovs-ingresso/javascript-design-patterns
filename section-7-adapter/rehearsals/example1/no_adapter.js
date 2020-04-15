class Stripe {
	constructor() {
		this.token = null;
	}

	getToken() {
		this.token = `${10000 * Math.random()}_${Date.now()}`;
		return this;
	}

	makePayment(amountInCents) {
		if (this.token && amountInCents) {
			return Promise.resolve(
				`Stripe payment completed for $${
					amountInCents / 100
				}, with secured_token: ${this.token}.`
			);
		}
	}
}

class PayPal {
	constructor(email) {
		this.email = email;
	}
	makePayment(amountInDollars) {
		if (this.email && amountInDollars) {
			return Promise.resolve(
				`PayPal payment completed for user email: ${this.email}, of the total $${amountInDollars}`
			);
		}
	}
}

class Shopping {
	constructor(name, email) {
		this.name = name;
		this.email = email;
		this.stripe = new Stripe();
		this.paypal = new PayPal(email);
		this.amount = 0;
	}

	addPrice(price) {
		this.amount += price;
		return this;
	}

	purchaseWithStripe() {
		this.stripe.getToken();
		const payment = this.stripe.makePayment(this.amount * 100);
		console.log(payment);
		this.amount = 0;
	}

	purchaseWithPayPal() {
		const payment = this.paypal.makePayment(this.amount);
		console.log(payment);
		this.amount = 0;
	}
}

const shopper = new Shopping("John", "john123@gmail.com");
shopper.addPrice(123.12).purchaseWithStripe();
shopper.addPrice(45.67).purchaseWithPayPal();
