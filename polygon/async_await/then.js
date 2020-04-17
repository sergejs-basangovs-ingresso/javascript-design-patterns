const fetch = require("node-fetch").default;

const delay = (ms) => new Promise((r) => setTimeout(() => r(), ms));

const URL = "https://jsonplaceholder.typicode.com/todos";

function fetchTodo(url) {
	console.log("Fetch Todo started...");

	return delay(2000)
		.then(() => fetch(url))
		.then((response) => response.json())
		.catch((err) => {
			console.log(err);
		});
}

fetchTodo(URL)
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.error(err);
	});
