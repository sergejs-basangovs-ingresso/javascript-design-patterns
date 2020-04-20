class Account {
	constructor() {
		this.next = null;
	}

	pay(amount) {
		if (this.canPay(amount)) {
			this.balance -= amount;
			console.log(
				`Paid ${amount} using ${this.name}. \n Remaining balance: ${this.balance}`
			);
		} else if (this.next) {
			console.log(`Cannot pay ${amount} with ${this.name}`);

			this.next.pay(amount);
		} else {
			console.log(
				"Sorry, we unable to pay with neither of your payment methods"
			);
		}
	}

	// verify if current element can proceed with payment:
	canPay(amount) {
		return this.balance >= amount;
	}

	// set the next element in chain
	setNext(account) {
		this.next = account;
	}
}

class PaymentMethod extends Account {
	constructor(name, balance = 0) {
		super();
		this.name = name;
		this.balance = balance;
	}
}

const master = new PaymentMethod("MasterCard", 150);
const paypal = new PaymentMethod("PayPal", 230);
const amex = new PaymentMethod("American Express", 600);

master.setNext(paypal);
paypal.setNext(amex);

master.pay(350);
