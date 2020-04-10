const fs = require("fs");
const path = require("path");

class NewLogger {
	constructor(fname) {
		this.file_name = path.join(__dirname, `${fname}.txt`);
	}

	writeLog(type, text) {
		fs.appendFile(this.file_name, `[ ${type} ] : ${text}\n`, (err) => {
			if (err) {
				console.log("error occurred: ", err);
			} else {
				console.log(`${type} appended to file ${this.file_name}`);
			}
		});
	}
}

module.exports = NewLogger;
