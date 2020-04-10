const NewLogger = require("./newLogger");

class LoggerAdapter {
	constructor(fname) {
		this.logger = new NewLogger(fname);
	}

	logInfo(text) {
		this.logger.writeLog("INFO", text);
	}

	logError(error) {
		this.logger.writeLog("ERROR", error);
	}
}

module.exports = LoggerAdapter;
