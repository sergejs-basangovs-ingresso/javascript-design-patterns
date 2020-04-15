// we shall calculate total cost of car production - piece per piece:
// engine, body, transmission, suspension

class Equipment {
	getName() {
		return this.name;
	}
	getPrice() {
		return this.price || 0;
	}
	setName(name) {
		this.name = name;
	}
	setPrice(price) {
		this.price = price;
	}
}

class Engine extends Equipment {
	constructor() {
		super();
		this.setName("Engine");
		this.setPrice(800);
	}
}

class Body extends Equipment {
	constructor() {
		super();
		this.setName("Body");
		this.setPrice(3000);
	}
}

class Transmission extends Equipment {
	constructor() {
		super();
		this.setName("Transmission");
		this.setPrice(4000);
	}
}

class Suspension extends Equipment {
	constructor() {
		super();
		this.setName("Suspension");
		this.setPrice(3000);
	}
}

class Composite extends Equipment {
	constructor() {
		super();
		this.equipmentList = [];
	}

	add(equipment) {
		this.equipmentList.push(equipment);
	}

	getPrice() {
		return this.equipmentList
			.map((equipment) => equipment.getPrice())
			.reduce((x, y) => x + y);
	}
}

class Car extends Composite {
	constructor() {
		super();
		this.setName("Audi");
	}
}

const myCar = new Car();

myCar.add(new Engine());
myCar.add(new Body());
myCar.add(new Transmission());
myCar.add(new Suspension());

console.log(`My car is ${myCar.getName()} and it costs $${myCar.getPrice()}`);
