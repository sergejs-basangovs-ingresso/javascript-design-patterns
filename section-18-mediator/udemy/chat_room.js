// client class:
class Person {
	constructor(name) {
		this.name = name;
		this.chatLog = [];
	}

	receive(sender, message) {
		const s = `${sender}: "${message}"`;
		this.chatLog.push(s);
		console.log(`[${this.name}'s chat session] ${s}`);
	}

	say(message) {
		this.room.broadcast(this.name, message);
	}

	pm(who, message) {
		this.room.message(this.name, who, message);
	}
}

//mediator class:
class ChatRoom {
	constructor() {
		this.people = [];
	}

	// join chat:
	join(p) {
		const joinMsg = `${p.name} joins chat.`;

		//send msg to all participants
		this.broadcast("room", joinMsg);

		//send-assign chat room reference to the joining person:
		p.room = this;

		//add to the participant list:
		this.people.push(p);
	}

	// broadcast/ send-to-all msg:
	broadcast(source, message) {
		for (const p of this.people) {
			if (p.name !== source) {
				p.receive(source, message);
			}
		}
	}

	// send personal messaging:
	message(source, destination, message) {
		for (const p of this.people) {
			if (p.name === destination) {
				p.receive(source, message);
			}
		}
	}
}

const room = new ChatRoom();
const john = new Person("John");
const jane = new Person("Jane");

room.join(john);
room.join(jane);

john.say("Hi room.");
jane.say("Oh! hey John.");

const simon = new Person("Simon");
room.join(simon);
simon.say("Hi everyone!");

jane.pm("Simon", "Glad you have joined us!");
