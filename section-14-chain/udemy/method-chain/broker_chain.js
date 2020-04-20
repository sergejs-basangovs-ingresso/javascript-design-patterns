class Event {
	constructor() {
		this.handlers = new Map(); // handlers - functions that can handle the event, whenever it is triggered
		this.count = 0;
	}

	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		return this.count;
	}

	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	fire(sender, args) {
		this.handlers.forEach(function (value, key, map) {
			value(sender, args);
		});
	}
}

// what are we going to query from the creatures
const WhatToQuery = Object.freeze({
	attack: 1,
	defense: 2,
});

class Query {
	constructor(creatureName, whatToQuery, value) {
		this.creatureName = creatureName;
		this.whatToQuery = whatToQuery;
		this.value = value;
	}
}

// game class - is our event broker, a central object that shares the events
class Game {
	constructor() {
		this.queries = new Event(); //the queries event will fire to ask some information from the creatures
	}

	performQuery(sender, query) {
		// every time we perform query - it will fire the queries event
		// => will call all handlers-fn associated with that event
		this.queries.fire(sender, query);
	}
}

class Creature {
	constructor(game, name, attack, defense) {
		this.game = game;
		this.name = name;
		// however the attack and defense values - are going to be modified,
		// so we want that attack and defense properties when are called -
		// give us their actual values, not their initial values:
		this.initial_attack = attack;
		this.initial_defense = defense;
	}

	// now we want to provide an ability for us to query the
	// Creature's attack or defense values, including all the modifiers:
	get attack() {
		const q = new Query(this.name, WhatToQuery.attack, this.initial_attack);
		//perform query where the sender arg - is this object instance:
		this.game.performQuery(this, q);
		return q.value; // means that this.attack = q.value
	}

	get defense() {
		const q = new Query(
			this.name,
			WhatToQuery.defense,
			this.initial_defense
		);
		this.game.performQuery(this, q);
		return q.value;
	}

	toString() {
		return `${this.name} (${this.attack}/${this.defense})`;
	}
}

// now, we'll create base class for modifiers:
class CreatureModifier {
	constructor(game, creature) {
		this.game = game;
		this.creature = creature;
		//then we have a token that gets returned when we have subscribed to all events in the game, (token - handler's index in map/ see Event class)
		// because remember, the CreatureModifier has to intercept whenever someone asks for creature's information
		// I has to be able to intercept and subsequently handle it somehow.
		this.token = game.queries.subscribe(
			//this.handle needs to be bind to current instance, so the reference to current object is going to be preserved
			// because the handle function is going to be called from the other instance (Game)
			this.handle.bind(this)
		);
	}

	handle(sender, query) {
		// code will be implemented in inheritors
	}

	//method when you want to dispose from the modifier, unsubscribe from all these queries:
	dispose() {
		this.game.queries.unsubscribe(this.token);
	}
}

class DoubleAttackModifier extends CreatureModifier {
	constructor(game, creature) {
		super(game, creature);
	}

	// we'll over-write the handle method, where we need to double the attack rating:
	handle(sender, query) {
		// assuming that the creature that came in query is the same creature as the creature of this current instance
		// and that the what to query is the attack property value
		// because we want to apply the modifier to that particular creature, to the particular property:
		if (
			query.creatureName === this.creature.name &&
			query.whatToQuery === WhatToQuery.attack
		) {
			query.value *= 2;
		}
	}
}

class IncreaseDefenseModifier extends CreatureModifier {
	constructor(game, creature) {
		super(game, creature);
	}

	handle(sender, query) {
		if (
			query.creatureName === this.creature.name &&
			query.whatToQuery === WhatToQuery.defense
		) {
			query.value++;
		}
	}
}
// create our event broker:
const game = new Game();

// creatures:
const goblin = new Creature(game, "Strong Goblin", 2, 2);
console.log(goblin.toString());

// create modifier:
const dam = new DoubleAttackModifier(game, goblin);
console.log(goblin.toString());

const idm = new IncreaseDefenseModifier(game, goblin);
console.log(goblin.toString());

idm.dispose();
console.log(goblin.toString());
