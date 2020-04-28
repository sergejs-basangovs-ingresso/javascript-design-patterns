class CombinationLock {
	constructor(combination) {
		this.combination = combination;
		this.reset();
		// todo
	}

	reset() {
		// reset lock state here
		this.status = "LOCKED";
		this.counter = 0;
	}

	enterDigit(digit) {
		// set this.status depending on state of the lock
		if (this.counter === 0) {
			this.status = digit.toString();
			this.counter++;
		} else {
			if (this.counter < this.combination.length) {
				this.status = this.status + digit;
				this.counter++;
			}
			if (this.counter === this.combination.length) {
				// have required combination length to verify numbers:
				this.verify();
			}
		}
	}

	verify() {
		if (this.status === this.combination.join("")) {
			this.status = "OPEN";
		} else {
			this.status = "ERROR";
		}
	}

	print() {
		console.log(`Status: ${this.status}, \n this.counter: ${this.counter}`);
	}
}

const cl = new CombinationLock([1, 2, 3, 4, 5]);
cl.print();
cl.enterDigit(1);
cl.print();
cl.enterDigit(2);
cl.print();
cl.enterDigit(3);
cl.print();
cl.enterDigit(4);
cl.print();
cl.enterDigit(7);
cl.print();
cl.enterDigit(7);
cl.print();
console.log("===================");

cl.reset();
cl.print();
cl.enterDigit(1);
cl.print();
cl.enterDigit(2);
cl.print();
cl.enterDigit(3);
cl.print();
cl.enterDigit(4);
cl.print();
cl.enterDigit(5);
cl.print();

console.log("======cl2===========");

const cl2 = new CombinationLock([11, 22, 3, 54, 85]);

cl2.print();
cl2.enterDigit(11);
cl2.print();
cl2.enterDigit(22);
cl2.print();
cl2.enterDigit(3);
cl2.print();
cl2.enterDigit(54);
cl2.print();
cl2.enterDigit(85);
cl2.print();
console.log("=================");
cl2.reset();
cl2.print();
cl2.enterDigit(11);
cl2.print();
cl2.enterDigit(22);
cl2.print();
cl2.enterDigit(3);
cl2.print();
cl2.enterDigit(54);
cl2.print();
cl2.enterDigit(05);
cl2.print();
