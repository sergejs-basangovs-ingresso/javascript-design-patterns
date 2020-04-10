let instance;

class Counter {
	constructor() {
		if (!instance) {
			instance = this;
			instance.count = 0;
		} else {
			return instance;
		}
	}

	getCount() {
		return instance.count;
	}

	increaseCount() {
		return instance.count++;
	}
}

const myCount1 = new Counter();
const myCount2 = new Counter();

myCount1.increaseCount();
myCount1.increaseCount();
myCount2.increaseCount();
myCount2.increaseCount();

console.log(myCount1.getCount());
