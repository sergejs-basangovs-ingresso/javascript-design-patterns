//mediator class:
class OfficialDealer {
	constructor() {
		this.customers = [];
	}

	orderAuto(customer, auto, info) {
		const name = customer.name;
		console.log(
			`Order name: ${name}. Order auto is: ${auto}.\nAdditional info: ${info}.\n`
		);
		this.addToCustomerList({ name, auto, info });
	}

	addToCustomerList(orderData) {
		this.customers.push(orderData);
	}

	getCustomerList() {
		return this.customers;
	}
}

//client class:
class Customer {
	constructor(name, dealerMediator) {
		this._name = name;
		this.dealerMediator = dealerMediator;
	}

	get name() {
		return this._name;
	}

	makeOrder(auto, info) {
		this.dealerMediator.orderAuto(this, auto, info);
	}
}
const dealer = new OfficialDealer();
const johnny = new Customer("Johnny", dealer);
const pony = new Customer("Pony", dealer);

johnny.makeOrder("BMW", "X6 3.3L Auto 2020");
pony.makeOrder("VW", "Beetle 1.3L Manual 2010");

console.log(dealer);
