const FancyLogger = require("./fancyLogger");

const logger = new FancyLogger();

function logSecondImplementation() {
	logger.printLogCount();
	logger.logMessage("Second File");
	logger.printLogCount();
	console.log("*****************");
}

module.exports = logSecondImplementation;
