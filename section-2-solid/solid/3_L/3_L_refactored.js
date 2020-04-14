//Liskov Substitution Principle
class Person {}

class Member extends Person {
	access() {
		console.log("You have access.");
	}
}

class Guest extends Person {
	constructor() {
		super();
		this.isGuest = true;
	}
}

class Frontend extends Member {
	canWriteFrontend() {
		console.log("Write frontend");
	}
}

class Backend extends Member {
	canWriteBackend() {
		console.log("Write backend");
	}
}
//now this will not breach the principle:
class PersonFromOtherCompany extends Guest {
	access() {
		throw new Error("You don't have access here !");
	}
}

function getAccess(member) {
	member.access();
}

getAccess(new Frontend());
getAccess(new Backend());
getAccess(new PersonFromOtherCompany());
