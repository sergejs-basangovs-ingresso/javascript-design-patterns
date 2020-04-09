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

	clone() {
		const proto = Object.getPrototypeOf(this); // grabs the current instance and gets the prototype of it
		const instance = Object.create(proto); // we create new object instance out of prototype of Shopper instance

		// then we copy current instance's values, that include already selected items(if any)
		//  for the moment when the method .clone() is called.
		instance._name = this._name;
		instance._shopping_list = [...this._shopping_list];
		return instance;
	}
}

module.exports = Shopper;
