class Shopper {
	constructor(name = "unknown name") {
		this._name = name;
		this._shopping_list = [];
	}

	set name(value) {
		this._name = value;
	}

	get name() {
		return this._name;
	}

	get shopping_list() {
		return this._shopping_list.join(", ");
	}

	addItemToList(item) {
		this._shopping_list.push(item);
	}
}

module.exports = Shopper;
