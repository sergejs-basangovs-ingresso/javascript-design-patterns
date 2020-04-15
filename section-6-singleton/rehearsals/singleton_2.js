class Logger {
	constructor(name) {
		this.name = name;
		this.log = [];
		if (!Logger.instance) {
			Logger.instance = this;
		} else {
			return Logger.instance;
		}
	}

	addLog(info) {
		this.log.push(info);
	}
	removeLog(info) {
		this.log = this.log.filter((log) => log !== info);
	}
}

const logger_john = new Logger("John");
const logger_jane = new Logger("Jane");
const logger_peter = new Logger("Peter");

logger_john.addLog("Hi from John.");
logger_jane.addLog("This is Jane.");
logger_peter.addLog("Here is Peter.");

console.log(logger_john);
