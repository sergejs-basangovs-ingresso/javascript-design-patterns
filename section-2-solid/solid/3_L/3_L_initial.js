//Liskov Substitution Principle
class Person {
	access() {
		console.log("You have access.");
	}
}

class Frontend extends Person {
	canWriteFrontend() {
		console.log("Write frontend");
	}
}

class Backend extends Person {
	canWriteBackend() {
		console.log("Write backend");
	}
}
//now we shall add another employee from different company:
class personFromOtherCompany extends Person {
	access() {
		throw new Error("You don't have access here !");
	}
	// an this code will work, BUT it will breach the Liskov Substitution Principle
}

function getAccess(person) {
	person.access();
}

getAccess(new Frontend());
getAccess(new Backend());
