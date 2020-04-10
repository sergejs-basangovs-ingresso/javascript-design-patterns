const logger = require("./fancyLogger");

function logSecondImplementation() {
	logger.printLogCount();
	logger.logMessage("Second File");
	logger.printLogCount();
	console.log("*****************");
}

module.exports = logSecondImplementation;
