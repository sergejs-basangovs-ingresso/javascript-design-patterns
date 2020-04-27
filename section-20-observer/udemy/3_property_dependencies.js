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

class PropertyChangedArgs {
	constructor(name, newValue) {
		this.name = name;
		this.newValue = newValue;
	}
}

class Person {
	constructor(name, age = null) {
		this.name = name;
		this._age = age;
		this.propertyChanged = new Event();
	}

	get age() {
		return this._age;
	}

	set age(value) {
		if (!value || this._age === value) return;
		//6) first we shall cache the canVote previous value
		const oldCanVote = this.canVote;
		this._age = value;

		this.propertyChanged.fire(this, new PropertyChangedArgs("age", value));
		// now we check if caVote property has changed: if so - we'll fire the event:
		if (oldCanVote !== this.canVote) {
			this.propertyChanged.fire(
				this,
				new PropertyChangedArgs("canVote", this.canVote)
			);
		}
	}
	//2) here we'll have a getter for prop canVote: that will say true if person's age is from 16 years old
	get canVote() {
		return this._age >= 16;
	}
	//3) so far so good - but what if we need a notification on that property ( canVote) change,
	// if person's voting status will change ? as you see, here we don't have a setter.
}

// 1) we'll have a component VotingChecker, that will check if a person can vote
class VotingChecker {
	constructor(person) {
		//4) here you'll want to catch the exact position when the person's voting status has changed, and write a log on it
		this.person = person;
		// and subscribe to the event,
		this.person.propertyChanged.subscribe(this.votingChanged.bind(this));
	}
	votingChanged(sender, args) {
		//here we want to check if the person who triggered event is our person
		// and for canVote property only:
		if (sender === this.person && args.name === "canVote") {
			console.log(`Voting status changed to  ${args.newValue}`);
		}
	}
}

//5) the question now is - where from do we fire the event for the property canVote change ???
// because canVote  - is a computed property and doesn't have a setter
//as the canVote prop is depending on the age prop - we shall do it from age setter there, but there are several steps to do it
// ( see the person's age setter above)

const person = new Person("John");
const checker = new VotingChecker(person);

for (let i = 10; i < 20; i++) {
	console.log(`Changing age to ${i}`);

	person.age = i;
}
