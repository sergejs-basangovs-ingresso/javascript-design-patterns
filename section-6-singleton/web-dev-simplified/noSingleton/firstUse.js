const FancyLogger = require("./fancyLogger");

const logger = new FancyLogger();

function logFirstImplementation() {
	logger.printLogCount();
	logger.logMessage("First File");
	logger.printLogCount();
	console.log("*****************");
}

module.exports = logFirstImplementation;
