class Tesla {
	info() {
		return "This is Tesla.";
	}

	accept(visitor) {
		visitor(this);
	}
}

class Bmw {
	info() {
		return "This is BMW.";
	}

	accept(visitor) {
		visitor(this);
	}
}

class Audi {
	info() {
		return "This is Audi.";
	}

	accept(visitor) {
		visitor(this);
	}
}

function exportVisitor(auto) {
	if (auto instanceof Tesla) {
		auto.export = () => console.log(`Export data: ${auto.info()}`);
	}
	if (auto instanceof Bmw) {
		auto.export = () => console.log(`Export data: ${auto.info()}`);
	}
	if (auto instanceof Audi) {
		auto.export = () => console.log(`Export data: ${auto.info()}`);
	}
}

const tesla = new Tesla();
const bmw = new Bmw();
const audi = new Audi();
tesla.accept(exportVisitor);
bmw.accept(exportVisitor);
audi.accept(exportVisitor);

tesla.export();
