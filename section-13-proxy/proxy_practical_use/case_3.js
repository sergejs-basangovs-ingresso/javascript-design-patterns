const axios = require("axios").default;
const USERS_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";

async function networkFetch(url) {
	try {
		const { data } = await axios.get(url);
		console.log(`response from server: \n`, data[0]);
		return data;
	} catch (error) {
		console.log(error);
	}
}
const cache = {};

const proxyNetFetch = new Proxy(networkFetch, {
	async apply(target, thisArg, args) {
		const url = args[0];

		if (cache[url]) {
			console.log(`response from cache:\n `, cache[url][1]);

			return cache[url];
		} else {
			cache[url] = await target.apply(thisArg, args);

			return target.bind(thisArg, args);
		}
	},
});

(async () => {
	await proxyNetFetch(USERS_URL);

	await proxyNetFetch(USERS_URL);
})();
