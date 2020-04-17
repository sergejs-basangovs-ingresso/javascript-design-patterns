const fetch = require("node-fetch").default;

const delay = (ms) => new Promise((r) => setTimeout(() => r(), ms));

const URL = "https://jsonplaceholder.typicode.com/todos";

async function fetchAsyncTodo(url) {
	console.log("Fetch Todo started...");

	try {
		await delay(2000);
		const response = await fetch(url);
		const data = await response.json();
		console.log("data: ", data[0]);
	} catch (error) {
		console.error(error);
	} finally {
		console.log("Print it in any case !");
	}
}

fetchAsyncTodo(URL);
