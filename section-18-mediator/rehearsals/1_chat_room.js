// client class:
class Person {
	constructor(name) {
		this.name = name;
		this.log = [];
		this.room = null;
	}

	// get messages:
	receive(sender, msg) {
		console.log(`[${this.name}'s chat space] ${sender}: ${msg}`);
		this.log.push({ sender, msg });
	}

	//speak to chat:
	chat(msg) {
		if (!this.room) {
			console.log("You haven't joined any chat");
			return;
		}
		this.room.broadcast(this.name, msg);
	}

	//pm , private message:
	pm(to, msg) {
		if (!this.room) {
			console.log("You haven't joined any chat");
			return;
		}
		this.room.message(this.name, to, msg);
	}
}

// mediator class:
class ChatRoom {
	constructor() {
		this.people = [];
	}

	//add new person:
	join(p) {
		const msg = `${p.name} joined chat.`;
		this.broadcast("admin", msg);
		//assign chatroom ref to the new person:
		p.room = this;
		//add to list
		this.people.push(p);
	}

	// broadcast to all:
	broadcast(sender, msg) {
		for (const p of this.people) {
			if (p !== sender) {
				p.receive(sender, msg);
			}
		}
	}

	// pm message:
	message(from, to, msg) {
		for (const p of this.people) {
			if (p.name === to || p.name === from) {
				p.receive(from, msg);
			}
		}
	}
}

const room = new ChatRoom();
const jack = new Person("Jack");
const erin = new Person("Erin");
const oksana = new Person("Oksana");

room.join(jack);
room.join(erin);

jack.chat("Hi All! Good to see ya!");
erin.chat("Hi Jack! What a surprise :) !");

room.join(oksana);

oksana.chat("Hi there :) ");
jack.chat("Hi Oksana - how are you ? :)");
erin.pm("Oksana", "Hi sweetie, so great to see ya here, kisses.");
