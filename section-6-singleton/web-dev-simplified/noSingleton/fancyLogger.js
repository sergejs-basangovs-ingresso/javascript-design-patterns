class FancyLogger {
	constructor() {
		this.log = [];
	}

	logMessage(message) {
		this.log.push(message);
		console.log(`Message: '${message}' logged`);
	}

	printLogCount() {
		console.log(`${this.log.length} logs`);
	}
}

module.exports = FancyLogger;
