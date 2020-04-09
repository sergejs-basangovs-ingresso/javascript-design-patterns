const deepNestedObj = {
	name: {
		fname: "Johnny",
		lname: "Pony",
	},
	address: {
		street: "2 Bormans st",
		postcode: "W68KL",
	},
	assets: {
		id: 12345,
		founds: [
			{ id: 1, name: "Golden Sachs Inc." },
			{ id: 2, name: "Nestle Plc." },
		],
		securities: {
			id: 21,
			name: "villa San Marino",
			address: {
				street: "12 Rue Gazelle",
				city: "Bourges",
				country: "Monaco",
			},
		},
		print: () => {
			console.log("Printing all!");
		},
	},
};
console.log(deepNestedObj.toString());

console.log(Person.toJsonPrint(deepNestedObj));
