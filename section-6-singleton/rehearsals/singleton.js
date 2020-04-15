class Counter {
	constructor() {
		if (!Counter.instance) {
			Counter.instance = this;
			this.count = 0;
		} else {
			return Counter.instance;
		}
	}

	increaseCount() {
		this.count++;
	}
}

const counter_1 = new Counter();
const counter_2 = new Counter();
const counter_3 = new Counter();

counter_1.increaseCount();
counter_2.increaseCount();
counter_3.increaseCount();

console.log(counter_1);
