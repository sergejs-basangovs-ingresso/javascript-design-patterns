class Creature {
	constructor() {
		this.strength = this.agility = this.intelligence = 10;
	}

	get sumOfStats() {
		return this.strength + this.agility + this.intelligence;
	}

	get averageStat() {
		return this.sumOfStats / 3.0;
	}

	get maxStat() {
		return Math.max(this.strength, this.agility, this.intelligence);
	}
}

const creature = new Creature();

creature.strength = 10;
creature.agility = 11;
creature.intelligence = 15;
console.log(
	`Creature has average stat: ${creature.averageStat}, max stat: ${creature.maxStat}, sum of stats = ${creature.sumOfStats}`
);

// however the design is very brittle here - if we need to add some more
// properties like wisdom, health etc. then we need to update all our methods
// which breaks the Open-Closed-Principle
// here we can use Array Backed Property approach to solve this issue
