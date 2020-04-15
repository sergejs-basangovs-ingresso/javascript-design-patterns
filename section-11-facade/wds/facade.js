const fetch = require("node-fetch");
const axios = require("axios").default;
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const USER_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function getUsers() {
	return getFetch(USERS_URL);
}

function getUserPosts(userId = 1) {
	return getFetch(USER_POSTS_URL, { userId });
}

getUsers().then((users) => {
	users.forEach((user) => {
		getUserPosts(user.id).then((posts) => {
			console.log(user.name);
			console.log(posts.length);
		});
	});
});

// const params = {
// 	userId: 1,
// 	post: 12,
// 	date: 12334,
// };

function getFetch(url, params = {}) {
	const queryString = Object.entries(params)
		.map((entry) => {
			return `${entry[0]}=${entry[1]}`;
		})
		.join("&");

	return fetch(`${url}?${queryString}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	}).then((res) => res.json());
}
