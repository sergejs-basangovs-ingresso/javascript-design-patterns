class FancyLogger {
	constructor() {
		if (!FancyLogger.instance) {
			this.log = [];
			FancyLogger.instance = this;
		}
		return FancyLogger.instance;
	}

	logMessage(message) {
		this.log.push(message);
		console.log(`Message: '${message}' logged`);
	}

	printLogCount() {
		console.log(`${this.log.length} logs`);
	}
}

const logger = new FancyLogger();
Object.freeze(logger);

module.exports = logger;
