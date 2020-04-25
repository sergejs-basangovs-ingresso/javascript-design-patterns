class Event {
	constructor() {
		// the set of handlers, callbacks that are handling the event
		// the reason it is good to have the handlers list as a Map - it is un-subscription easy done with Map.
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

	//firing the event. whenever something happens, we want notification to take place
	// there are two types of information you want ot pass to handlers:
	// 1) who fired the event ?
	// 2) any additional data ( event args )
	fire(sender, args) {
		//here we go through list of all our handlers, and each basically called with the arguments provided
		this.handlers.forEach((value, key) => value(sender, args));
	}
}

//then , we also may have a set of classes, storing the information specific to event:
// like for our case when the person falls ill,
// what kind of information does it need to provide ( like address etc.) for doctor visit ?
class FallsIllArgs {
	constructor(address) {
		this.address = address;
	}
}

class Person {
	constructor(address) {
		this.address = address;
		//we shall create a new event when the person falls ill:
		this.fallsIll = new Event();
		//so from now on, anyone who has access to person's object can subscribe to this event;
	}

	// we want ot be notified if the person will catch a cold
	catchCold() {
		// here we shall actually, fire our `this.fallsIll` event: where 1st argument is the sender(this) ,
		// and 2nd arg:  set of arguments related to the event:
		this.fallsIll.fire(this, new FallsIllArgs(this.address));
	}
}

const person = new Person("123 Jump Street, W68JN, London, UK");
const sub = person.fallsIll.subscribe((sender, args) => {
	console.log(`A doctor has been called to the address: ${args.address}`);
});
person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(sub);
person.catchCold();
