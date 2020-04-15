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

class PaymentWithPayPal {
	constructor(email) {
		this.email = email;
		this.paypal = new PayPal(email);
	}

	purchase(amount) {
		return this.paypal.makePayment(amount);
	}
}
class PaymentWithStripe {
	constructor() {
		this.stripe = new Stripe();
	}

	purchase(amount) {
		return this.stripe.getToken().makePayment(amount * 100);
	}
}

class PaymentAdapter {
	constructor(email, paymentMethod) {
		this.paymentMethod = new paymentMethod(email);
	}

	purchase(amount) {
		return this.paymentMethod.purchase(amount);
	}
}

class Shopping {
	constructor(name, email, Service) {
		this.name = name;
		this.email = email;
		this.amount = 0;
		this.adapter = new PaymentAdapter(email, Service);
	}

	addPrice(price) {
		this.amount += price;
		return this;
	}

	payment() {
		const purchase = this.adapter.purchase(this.amount);
		console.log(purchase);
		this.amount = 0;
	}
}

const shopper_1 = new Shopping("John", "john.doe@gmail.com", PaymentWithPayPal);
shopper_1.addPrice(23.45).payment();

const shopper_2 = new Shopping(
	"Lena",
	"lena.karaoke@yahoo.com",
	PaymentWithStripe
);
shopper_2.addPrice(105.23).payment();
