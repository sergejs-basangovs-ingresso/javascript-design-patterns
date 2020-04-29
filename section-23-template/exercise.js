class Creature {
	constructor(attack, health) {
		this.attack = attack;
		this.health = health;
	}
}

class CardGame {
	constructor(creatures) {
		this.creatures = creatures;
	}

	// returns index of winner if there's a winner
	// returns -1 if there's no winner (both alive or both dead)
	combat(creature1index, creature2index) {
		let first = this.creatures[creature1index];
		let second = this.creatures[creature2index];
		this.hit(first, second);
		this.hit(second, first);
		let firstAlive = first.health > 0;
		let secondAlive = second.health > 0;
		if (firstAlive === secondAlive) return -1;
		return firstAlive ? creature1index : creature2index;
	}

	hit(attacker, defender) {
		throw new Error("Please implement this in inheritors");
	}
}

class TemporaryCardDamageGame extends CardGame {
	constructor(creatures) {
		super(creatures);
	}

	hit(attacker, defender) {
		// todo
		const combatHealth = defender.health - attacker.attack;
		if (combatHealth <= 0) {
			defender.health = combatHealth;
		}
	}
}

class PermanentCardDamageGame extends CardGame {
	constructor(creatures) {
		super(creatures);
	}

	hit(attacker, defender) {
		// todo
		defender.health -= attacker.attack;
	}
}

const c1 = new Creature(1, 2);
const c2 = new Creature(1, 3);
const tempCardGame = new TemporaryCardDamageGame([c1, c2]);
const permCardGame = new PermanentCardDamageGame([c1, c2]);

console.log(tempCardGame.combat(0, 1));
console.log("c1: ", c1);
console.log("c2: ", c2);
console.log(tempCardGame.combat(0, 1));
console.log("c1: ", c1);
console.log("c2: ", c2);
console.log(tempCardGame.combat(0, 1));
console.log("c1: ", c1);
console.log("c2: ", c2);

console.log("==== permanent damage game: =========");
console.log(permCardGame.combat(0, 1));
console.log("c1: ", c1);
console.log("c2: ", c2);
console.log(permCardGame.combat(0, 1));
console.log("c1: ", c1);
console.log("c2: ", c2);
console.log(permCardGame.combat(0, 1));
console.log("c1: ", c1);
console.log("c2: ", c2);
