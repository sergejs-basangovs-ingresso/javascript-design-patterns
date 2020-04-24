class Memento {
	constructor(carMake, year, price) {
		this.car = [carMake, year, price];
	}
}

class CarPreferences {
	constructor(carMake = null, year = null, price = null) {
		this.carMake = carMake;
		this.year = year;
		this.price = price;
		this.history = [new Memento(carMake, year, price)];
		this.pointer = 0;
	}

	setPreferences(carMake, year, price) {
		this.carMake = carMake;
		this.year = year;
		this.price = price;
		//save a memento:
		const memento = new Memento(this.carMake, this.year, this.price);
		this.history.push(memento);
		this.pointer++;
		return memento;
	}

	restore(memento) {
		if (memento) {
			this.consumeMemento(memento);
			this.history.push(memento);
			this.pointer = this.history.length - 1;
		}
	}

	undo() {
		if (this.pointer > 0) {
			this.pointer--;
			const memento = this.history[this.pointer];
			this.consumeMemento(memento);
			return memento;
		}
		return null;
	}

	redo() {
		if (this.pointer + 1 < this.history.length) {
			this.pointer++;
			const memento = this.history[this.pointer];
			this.consumeMemento(memento);
			return memento;
		}
	}

	consumeMemento(memento) {
		const [carMake, year, price] = memento.car;
		this.carMake = carMake;
		this.year = year;
		this.price = price;
	}

	print() {
		console.log(
			`Preferences: ${this.carMake} / ${this.year} / ${this.price}`
		);
	}
}

const cp = new CarPreferences("BMW X6", 2020, 45000);
cp.print();

const m1 = cp.setPreferences("BMW X5", 2017, 25000);
const m2 = cp.setPreferences("Audi Q7", 2019, 35000);
cp.print();

console.log("\n====== restore m1: BMW X5 ========== \n");
cp.restore(m1);
cp.print();

console.log("\n====== undo last operation: ========== \n");
cp.undo();
cp.print();

console.log("\n====== undo all way to initial: ========== \n");
cp.undo();
cp.print();
cp.undo();
cp.print();
console.log("\n====== try to undo the initial: ========== \n");
cp.undo();
cp.print();

console.log("\n====== redo all: ========== \n");
cp.redo();
cp.print();
cp.redo();
cp.print();

console.log("\n====== try to redo past the last: ========== \n");
cp.redo();
cp.print();
