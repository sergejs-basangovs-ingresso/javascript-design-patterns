class Creature {
	constructor(name, attack, defence) {
		this.name = name;
		this.attack = attack;
		this.defence = defence;
	}
	toString() {
		return `${this.name} (${this.attack}/${this.defence})`;
	}
}

class CreatureModifier {
	constructor(creature) {
		this.creature = creature;
		this.next = null; // linked list
	}

	add(modifier) {
		if (this.next) this.next.add(modifier);
		else this.next = modifier;
	}

	handle() {
		if (this.next) this.next.handle();
	}
}

// creating modifiers: the magic item - that doubles the attack of the given creature:
class DoubleAttackModifier extends CreatureModifier {
	constructor(creature) {
		super(creature);
	}

	handle() {
		console.log(`Doubling ${this.creature.name}'s attack`);
		this.creature.attack *= 2;
		super.handle();
	}
}

class IncreaseDefenceModifier extends CreatureModifier {
	constructor(creature) {
		super(creature);
	}

	handle() {
		console.log(`Doubling ${this.creature.name}'s defence`);
		this.creature.defence *= 2;
		super.handle();
	}
}

const goblin = new Creature("Goblin", 1, 1);
console.log(goblin);

let root = new CreatureModifier(goblin);
root.add(new DoubleAttackModifier(goblin));
root.add(new IncreaseDefenceModifier(goblin));

root.handle();
console.log(goblin.toString());
console.log("Root: ", JSON.stringify(root, null, 2));
