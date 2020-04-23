class Event {
	constructor() {
		this.handlers = new Map();
		this.count = 0;
	}

	//subscribe: (add callback function to the map)
	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		//return counter as the reference where the callback function-handler is stored
		return this.count;
	}

	//unsubscribe: (remove callback fn from the map)
	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	//fire event: (trigger all stored callback-handlers): all triggered functions will behave depending on the
	// arguments passed: sender and args by the object that will fire this event:
	fire(sender, args) {
		this.handlers.forEach((value, key) => {
			value(sender, args);
		});
	}
}

//mediator - game, in this case:
class Game {
	constructor() {
		this.events = new Event();
	}
}

class ScoredGoalEvent {
	constructor(playerName, goalsScoredByPlayer) {
		this.playerName = playerName;
		this.goalsScoredByPlayer = goalsScoredByPlayer;
	}

	print() {
		console.log(
			`BANG!!! ${this.playerName} has scored ${this.goalsScoredByPlayer} goal !`
		);
	}
}

class Player {
	constructor(name, game) {
		this.name = name;
		this.game = game;
		this.scoredGoals = 0;
	}

	score() {
		this.scoredGoals++;
		// then will fire an event of the scored goal: bang - into the cage!!!
		const args = new ScoredGoalEvent(this.name, this.scoredGoals);
		args.print();
		this.game.events.fire(this, args);
	}
}

class Coach {
	constructor(game) {
		this.handlerIndex = game.events.subscribe((sender, args) => {
			// define the callback function behaviour depending on the arguments:
			if (
				args instanceof ScoredGoalEvent &&
				args.goalsScoredByPlayer < 3
			) {
				console.log(`Coach says : well done ${args.playerName} !`);
			} else if (
				args instanceof ScoredGoalEvent &&
				args.goalsScoredByPlayer >= 3
			) {
				console.log(`Coach says nothing.`);
			}
		});

		//this.handlerIndex - later can be used within the class to remove the event handler(if needed)
	}
}

// ======= Play! =========
const game = new Game();
const player = new Player("Ronaldo", game);
const coach = new Coach(game);

player.score();
player.score();
player.score();
