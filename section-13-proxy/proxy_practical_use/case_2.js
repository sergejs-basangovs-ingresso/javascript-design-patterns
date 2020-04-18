function networkFetch(url) {
	return `${url} - response from server.`;
}
const cache = new Set();

const proxyNetFetch = new Proxy(networkFetch, {
	apply(target, thisArg, args) {
		const url = args[0];
		if (cache.has(url)) {
			return `${url} - response from cache.`;
		} else {
			cache.add(url);
			return Reflect.apply(target, thisArg, args);
		}
	},
});

console.log(proxyNetFetch("angular.io"));
console.log(proxyNetFetch("react.io"));
console.log(proxyNetFetch("angular.io"));
console.log("cache :", cache);
