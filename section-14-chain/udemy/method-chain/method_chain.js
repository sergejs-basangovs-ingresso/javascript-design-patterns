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
		this.next = null;
	}

	add(modifier) {
		if (this.next) this.next.add(modifier);
		else this.next = modifier;
	}

	handle() {
		if (this.next) this.next.handle();
	}
}

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
		if (this.creature.attack <= 2) {
			console.log(`Increasing ${this.creature.name}'s defence`);
			this.creature.defence++;
		}
		super.handle();
	}
}

const goblin = new Creature("Goblin", 1, 1);

const root = new CreatureModifier(goblin);

root.add(new DoubleAttackModifier(goblin));
console.log(goblin.toString());

root.add(new IncreaseDefenceModifier(goblin));

root.handle();

console.log(goblin.toString());
