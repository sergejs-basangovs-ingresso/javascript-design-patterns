class Event {
	constructor() {
		this.handlers = new Map();
		this.count = 0;
	}

	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		return this.count;
	}

	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	fire(sender, args) {
		this.handlers.forEach((value, key) => value(sender, args));
	}
}

// 5) we may want to create the event specific object:
class PropertyChangedArgs {
	constructor(name, newValue) {
		this.name = name;
		this.newValue = newValue;
	}
}

// 1) what we might want - is to get notified, when it changes the person's age
class Person {
	constructor(name, age = null) {
		this.name = name;
		this._age = age;
		// 2)we shall create an event 'propertyChanged', that will handle the change of age:
		this.propertyChanged = new Event();
		// 3) so now, everyone who is interested may subscribe to the propertyChanged event to get notified if any changes
	}

	// 4) let us make getters and setters for the age property:
	get age() {
		return this._age;
	}

	set age(value) {
		if (!value || this._age === value) return;
		this._age = value;

		//6) then - we shall trigger the event propertyChanged:
		this.propertyChanged.fire(this, new PropertyChangedArgs("age", value));
	}
}

class RegistrationCheck {
	constructor(person) {
		this.person = person;

		// 7) I am also going to subscribe to the person's PropertyChanged event:
		this.token = this.person.propertyChanged.subscribe(
			//here we need to provide a handler that well react to the change of age:
			//9)also we need to bind our own method to `this` when we pass it as a callback, because when function passed as
			// a c-back `this` context value changing:
			this.ageChanged.bind(this)
		);
	}

	// 8) we'll write the event handler here as own method:
	ageChanged(sender, args) {
		//make sure the sender is actually the person we are monitoring,
		// also the property to monitor is the `age` property only, not other properties

		if (sender === this.person && args.name === "age") {
			if (args.newValue < 13) {
				console.log(`You're too young to register.`);
			} else {
				console.log(`OK, you can register.`);
				//also we need to unsubscribe the person from being monitored for the age restriction:
				sender.propertyChanged.unsubscribe(this.token);
			}
		}
	}
}

const person = new Person("John");
const checker = new RegistrationCheck(person);

for (let i = 10; i < 20; i++) {
	console.log(`\nChanging age to ${i}:`);

	person.age = i;
}
