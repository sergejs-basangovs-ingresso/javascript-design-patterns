class Game {
	constructor(numberOfPlayers) {
		this.numberOfPlayers = numberOfPlayers;
		//also we may have a current player:
		this.currentPlayer = 0;
	}

	//1. we're going to have a run() method , and this method will be
	// actually our template: the template method will define what needs to be done in general
	// without defining the concrete parts:
	run() {
		//2. we're using some methods and properties here that are not yet defined:
		this.start();
		while (!this.haveWinner) {
			this.takeTurn();
		}
		console.log(`Player ${this.winningPlayer} has won.`);
		// 3. as you see here there is a number of properties and methods missing( they're not defined yet)
	}
	//4. So what we'll do - we shall define this 'missing' methods and properties as blank values:
	// so that whoever inherit from this class(later) can customize them how it will fit best for the inheritor

	start() {}
	get haveWinner() {}
	takeTurn() {}
	get winningPlayer() {}

	//5. So what we have done: we've defined the template method run() where we've defined a
	// general structure that every single game will need to follow, BUT we haven't defined the
	// concrete implementations of the participating methods and properties like start(), haveWinner etc.
}

//6. now let us simulate a bit the game of chess:
class Chess extends Game {
	constructor() {
		super(2);
		this.maxTurns = 10;
		this.turn = 1;
	}

	//7. here we'll not need to override the .run(), but we shall over-write the other 'empty' methods:

	start() {
		console.log(
			`Starting a game of chess with ${this.numberOfPlayers} players.`
		);
	}
	get haveWinner() {
		// we shall just temporary set it to happen when the max num of turns will be done.
		return this.turn === this.maxTurns;
	}
	takeTurn() {
		console.log(
			`Turn ${this.turn++} taken by player ${this.currentPlayer}`
		);
		// also, we shall flip the players each turn (if was player1, now it will be player2 and so on):
		this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
	}
	get winningPlayer() {
		// will just return the current player just to simulate game:
		return this.currentPlayer;
	}
}

const chess = new Chess();
chess.run();
