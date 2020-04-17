// Functions:
const log = (text) => `Log: ${text}`;

const fp = new Proxy(log, {
	apply(target, thisArg, args) {
		console.log("Calling fn...");
		//also, here we can run our preliminary logic
		//before we execute the function

		return target.apply(thisArg, args).toUpperCase();
	},
});

console.log(fp("some text example"));
