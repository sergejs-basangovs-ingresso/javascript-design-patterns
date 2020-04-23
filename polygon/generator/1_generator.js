function* generatorFn() {
	console.log("before yield");
	yield;
	console.log("after yield");
}

const gn = generatorFn();
console.log(gn.next());
console.log(gn.next());

function* words() {
	yield " Uno";
	yield " Dos";
	yield " Tres";
}

function* iterableGeneratorFunc() {
	yield "adios";
	yield* words(); // a string is an iterable!
	yield "au revoir";
}

const igf = iterableGeneratorFunc();
for (const x of igf) {
	console.log(x);
}
