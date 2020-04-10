const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const OldLogger = require("./loggerAdapter");

class ClientLogger {
	constructor(name) {
		this.name = name;
		this.logger = new OldLogger(name.toLowerCase());
	}
	makeInfoEntry() {
		rl.question("Enter log message: ", (answer) => {
			this.logger.logInfo(answer);
			rl.close();
		});
	}

	makeErrorEntry() {
		rl.question("Enter error message: ", (answer) => {
			this.logger.logError(answer);
			rl.close();
		});
	}
}

const logger = new ClientLogger("John");
// logger.makeInfoEntry();
logger.makeErrorEntry();
