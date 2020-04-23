class Event {
	constructor() {
		this.handlers = new Map();
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
		this.handlers.forEach((v, k) => {
			v(sender, args);
		});
	}
}

class PlayerScoredEventArgs {
	constructor(playerName, goalsScoredSoFar) {
		this.playerName = playerName;
		this.goalsScoredSoFar = goalsScoredSoFar;
	}
	print() {
		console.log(
			`${this.playerName} has scored their ${this.goalsScoredSoFar} goal`
		);
	}
}

class Game {
	constructor() {
		//single event object that everyone can subscribe to:
		this.events = new Event();
	}
}

// the player must specify the game he/she is playing at
// so all our peripheral components(players) can keep reference to the mediator, so
// they can all communicate to one another via mediator:
class Player {
	constructor(name, game) {
		this.name = name;
		this.game = game;
		this.goalsScored = 0;
	}

	score() {
		this.goalsScored++;
		//also we shall all subscribers know about the scored goal:
		const args = new PlayerScoredEventArgs(this.name, this.goalsScored);

		this.game.events.fire(this, args);
	}
}

// who is going to consume this information?
// coach ! : he will congratulate the player if he'd scored between 1 and 3 goals
//we shall add the event listener for the scored goals
class Coach {
	constructor(game) {
		game.events.subscribe((sender, args) => {
			// here verify if the args are from the expected event (which is PlayerScoredEventArgs),
			// as you don't want to congratulate the player if he got a red carton event :)
			if (
				args instanceof PlayerScoredEventArgs &&
				args.goalsScoredSoFar < 3
			) {
				console.log(`Coach says: Well done ${args.playerName}`);
			}
		});
	}
}

//======== let's play : ==============
const game = new Game();

const player = new Player("Sam", game);
const coach = new Coach(game);

player.score();
player.score();
player.score();
