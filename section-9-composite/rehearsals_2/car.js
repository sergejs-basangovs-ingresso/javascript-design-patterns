class Component {
	constructor(name) {
		this.name = name;
		this.mounted = false;
	}

	print() {
		console.log(`${this.name} / mounted: ${this.mounted}`);
	}

	mount() {
		this.mounted = true;
	}

	dismantle() {
		this.mounted = false;
	}
}

class CompositeComponent {
	constructor(name, components = []) {
		this.name = name;
		this.mounted = false;
		this.components = [...components];
		this.buffer = [];
		this.depth = 0;
	}

	add(component) {
		this.components.push(component);
	}

	print() {
		console.log(`${this.name} / mounted: ${this.mounted}`);
		this.components.forEach((c) => c.print());
	}

	mount() {
		this.mounted = true;
		this.components.forEach((item) => item.mount());
	}

	dismantle() {
		this.mounted = false;
		this.components.forEach((item) => item.dismantle());
	}
}

const engine = new CompositeComponent("engine", [
	new Component("injector"),
	new Component("spark plug"),
	new CompositeComponent("fuel pump", [
		new Component("back pressure valve"),
		new Component("pressure chamber"),
	]),
	new Component("battery"),
]);

// console.log(engine);

engine.print();
console.log("============ mounting: =======");

engine.mount();
engine.print();

console.log("============ dismantling: ========");
engine.dismantle();
engine.print();
