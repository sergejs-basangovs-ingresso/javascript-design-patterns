const tree = {
	one: {
		name: "John Silver",
		pirate: true,
		phone: 134142352,
		connections: {
			ship: { name: "Cantarella", cannons: 23, crew: 23 },
			keepAlive: true,
		},
	},
	two: {
		name: "Billy Bounce",
		pirate: true,
		phone: 575675867,
		connections: {
			ship: { name: "Black Pearl", cannons: 23, crew: 33 },
			keepAlive: false,
			bar: "Admiral Ben Bow",
		},
	},
	three: "decommissioned",
	four: "decommissioned",
	five: {
		name: "Jack Sparrow",
		pirate: true,
		phone: 575675867,
		assets: {
			ship: { name: "Black Pearl", cannons: 22, crew: 33 },
			keepAlive: false,
			bar: "Catalina",
		},
	},
};

// returns true if value exists
let level = 1;
let path = "/";
function findByValue(treeObject, value, found = []) {
	for (const key in treeObject) {
		if (treeObject[key] === value) {
			found.push(treeObject[key]);
			console.log("found :", found);
			console.log("at: ", path);
		}

		if (typeof treeObject[key] === "object") {
			path += `${key}/`;
			findByValue(treeObject[key], value, found);
		}
	}
	return found.includes(value);
}

console.log(findByValue(tree, "Black Pearl"));
