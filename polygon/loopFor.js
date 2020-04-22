const arr = ["a", "b", "c", "d"];

console.log("==== i++ =====");
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i] + i);
}

console.log("\n ==== ++i ==== ");

for (let i = 0; i < arr.length; ++i) {
	console.log(arr[i] + i);
}
