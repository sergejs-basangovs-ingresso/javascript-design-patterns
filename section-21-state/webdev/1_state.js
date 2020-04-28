class OrderStatus {
	constructor(name, nextStatus) {
		this.name = name;
		this.nextStatus = nextStatus;
	}
	next() {
		//that will move us to the next step in processing the order
		return new this.nextStatus();
	}
}

class WaitingForPayment extends OrderStatus {
	constructor() {
		super("waiting for payment", Shipping);
	}
}

class Shipping extends OrderStatus {
	constructor() {
		super("shipping", Delivered);
	}
}

class Delivered extends OrderStatus {
	constructor() {
		super("delivered", Delivered);
	}
}

class Order {
	constructor() {
		this.state = new WaitingForPayment();
	}
	nextState() {
		this.state = this.state.next();
	}

	cancelOrder() {
		this.state === "waitingForPayment"
			? console.log("Order is canceled.")
			: console.log("Order cannot be canceled. ");
	}

	status() {
		console.log(`Order status: ${this.state.name}`);
	}
}

const order = new Order();
order.status();
order.nextState();
order.status();
order.nextState();
order.status();
order.nextState();
order.status();
