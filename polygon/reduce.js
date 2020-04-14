const arr = [1, 2, 3];
const arr_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = arr.reduce((x, y) => x + y);
const deduct = arr.reduce((x, y) => x - y);
const ascending = arr.reduce((x, y) => x < y);
const descending = arr.reduce((x, y) => x > y);

const arrToObject = arr.reduce((accumulator, current) => {
	accumulator["prop_" + current] = current;
	return accumulator;
}, {});

console.log(
	`
  SUM: ${sum}
  DEDUCT: ${deduct}
  ASCENDING ORDER: ${ascending}
  DESCENDING ORDER: ${descending}
  `
);

console.log("arrToObject: ", arrToObject);

const chunkArray = (array, chunk_size) => {
	const result = [];
	let chunk = [];
	for (let i = 0; i < array.length; i++) {
		if (i % chunk_size === 0) {
			chunk = array.slice(i, i + chunk_size);
			result.push(chunk);
		}
	}
	return result;
};

const chunkArray_2 = (array, chunk_size) => {
	return array.reduce((accumulator, current, index, arr) => {
		if (index % chunk_size === 0) {
			accumulator.push(arr.slice(index, index + chunk_size));
		}

		return accumulator;
	}, []);
};

const obj = {
	one: { name: "Johnny Pony", phone: 1242554365 },
	two: { name: "Pony Johnny", phone: 2152456363 },
};

const arr_3 = [
	{ name: "Johnny Pony", phone: 1242554365, itemId: "one" },
	{ name: "Pony Johnny", phone: 2152456363, itemId: "two" },
];

const objectToArray = (object) => {
	return Object.keys(object).map((key) => {
		return { ...object[key], itemId: key };
	});
};

console.log("result: ", chunkArray_2(arr_2, 3));
console.log(objectToArray(obj));

const arrayToObject = (array, byItemKey) => {
	return array.reduce((accumulator, current) => {
		const copyCurrent = { ...current };
		delete copyCurrent[byItemKey];
		accumulator[current[byItemKey]] = copyCurrent;
		return accumulator;
	}, {});
};

console.log(arrayToObject(arr_3, "itemId"));
