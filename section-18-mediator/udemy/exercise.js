class Mediator {
	// todo
	constructor() {
		this.people = [];
	}
	add(person) {
		this.people.push(person);
	}

	broadcast(person, value) {
		this.people.forEach((p) => {
			if (p.id !== person.id) {
				p.receive(value);
			}
		});
	}
}

class Participant {
	constructor(mediator) {
		// todo
		this.mediator = mediator;
		this.value = 0;
		this.id = Math.floor(Math.random() * Date.now());
		mediator.add(this);
	}

	say(n) {
		// todo
		this.mediator.broadcast(this, n);
	}

	receive(value) {
		this.value = value;
	}
}

const mediator = new Mediator();
const p1 = new Participant(mediator);
const p2 = new Participant(mediator);

console.log(mediator);

p1.say(3);
console.log(p1);
console.log(p2);

p2.say(2);
console.log(p1);
console.log(p2);
