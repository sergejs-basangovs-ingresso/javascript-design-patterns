//Symbols
const symbol = Symbol("mySymbol");
const symbol2 = Symbol("mySymbol");
const symbol3 = Symbol.for("mySymbol_2");
const symbol4 = Symbol.for("mySymbol_2");

console.log(symbol === symbol2);
console.log(symbol3 === symbol4);
//

const symbolName = Symbol.keyFor(symbol4);
console.log(symbolName);

const person = {
	name: "Jack",
	age: 20,
	[Symbol.for("password")]: "Jack20",
	[Symbol.for("nickname")]: "Freeman",
};

console.log(person);
console.log("person[Symbol.for('password')] :", person[Symbol.for("password")]);
console.log(Object.getOwnPropertySymbols(person));
