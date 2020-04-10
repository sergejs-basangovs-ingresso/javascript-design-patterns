// interface for the browser:
//needs to adapt to use in node ( where no localStorage).
const localStorage = require("./adapter.js");

console.log("Storage length: ", localStorage.length);

const uid = localStorage.getItem("user_id");
console.log("user_id :", uid);

if (!uid) {
	console.log("User ID not found. Setting the user id and token...");
	localStorage.setItem("token", "adasd6af6fASDefer34552rwft45gERgE");
	localStorage.setItem("user_id", "12345");
} else {
	console.log("User ID found: ", uid);
	console.log("Clearing the log...");
	localStorage.clear();
}
