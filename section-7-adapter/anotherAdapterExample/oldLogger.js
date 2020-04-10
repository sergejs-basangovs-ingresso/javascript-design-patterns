const fs = require("fs");
const path = require("path");

class OldLogger {
	constructor(fname) {
		this.file_name = fname;
	}

	logInfo(text) {
		const fileName = path.join(__dirname, `${this.file_name}.txt`);
		fs.appendFile(fileName, `[ INFO ] : ${text}\n`, (err) => {
			if (err) {
				console.log("error occurred: ", err);
			} else {
				console.log(`Text appended to file ${this.file_name}`);
			}
		});
	}

	logError(error) {
		const fileName = path.join(__dirname, `${this.file_name}.txt`);
		fs.appendFile(fileName, `[ ERROR ] : ${error}\n`, (err) => {
			if (err) {
				console.log("error occurred: ", err);
			} else {
				console.log(`Error info appended to file ${this.file_name}`);
			}
		});
	}
}

// const myLogger = new OldLogger("serge-file");
// myLogger.logInfo("Some info entry.");

module.exports = OldLogger;
