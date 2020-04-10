const logger = require("./fancyLogger");

function logFirstImplementation() {
	logger.printLogCount();
	logger.logMessage("First File");
	logger.printLogCount();
	console.log("*****************");
}

module.exports = logFirstImplementation;
