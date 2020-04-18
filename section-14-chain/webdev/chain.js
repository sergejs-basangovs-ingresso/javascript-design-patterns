class Account {
	// pay the order price
	pay(orderPrice) {
		// 1) verify if can pay and then attempt to pay :
		if (this.canPay(orderPrice)) {
			console.log(`Paid ${orderPrice} using ${this.name}`);
		} // 2) then if cannot pay - log it, check if there is next payment method, then recursively proceed with next:
		else if (this.incomer) {
			console.log(`Cannot pay with ${this.name}`);

			this.incomer.pay(orderPrice);
		} // 3) if all next methods fail: log cannot pay
		else {
			console.log("We regret - there is not enough money.");
		}
	}

	// verify if enough money to pay
	canPay(amount) {
		return this.balance >= amount;
	}

	// setting next available payment card/method
	setNext(account) {
		this.incomer = account;
	}
}

class Master extends Account {
	constructor(balance) {
		super();
		this.name = "Master Card";
		this.balance = balance;
	}
}

class PayPal extends Account {
	constructor(balance) {
		super();
		this.name = "PayPal";
		this.balance = balance;
	}
}

class Qiwi extends Account {
	constructor(balance) {
		super();
		this.name = "Qiwi";
		this.balance = balance;
	}
}

//======= Using: ===================
//Set payment systems:
const master = new Master(100);
const paypal = new PayPal(200);
const qiwi = new Qiwi(500);

// Define Chain:
master.setNext(paypal);
paypal.setNext(qiwi);

//Start payment:
master.pay(438);
