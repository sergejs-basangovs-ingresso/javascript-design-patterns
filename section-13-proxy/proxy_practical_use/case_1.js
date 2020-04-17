//============Wrapper:=============
const withDefaultValue = (target, defaultValue = 0) => {
	return new Proxy(target, {
		get: (target, prop) => (prop in target ? target[prop] : defaultValue),
	});
};

const position = withDefaultValue({ x: 24, y: 42 }, 0);

// so now all new keys that were not defined will have default value : 0
console.log(position);
console.log("z: ", position.z);

//============ Hidden properties:=============
// here we want to set our properties that those starting with '_' , should not be accessible
const withHiddenProps = (target, prefix = "_") => {
	return new Proxy(target, {
		has: (target, prop) => prop in target && !prop.startsWith(prefix),
		ownKeys: (target) =>
			Reflect.ownKeys(target).filter((p) => !p.startsWith(prefix)),
		get: (target, prop, receiver) =>
			prop in receiver ? target[prop] : undefined,
	});
};

const john = withHiddenProps({
	name: "John",
	age: 44,
	_uid: "Secret num 12345",
});

console.log(john);
console.log(Object.keys(john));

//============ Optimization:=============
const userData = [
	{ id: 11, name: "John", job: "Front End", age: 30 },
	{ id: 24, name: "Lena", job: "Student", age: 21 },
	{ id: 303, name: "Alan", job: "Back End", age: 35 },
	{ id: 445, name: "Kate", job: "Teacher", age: 26 },
];
// normally , if we need to find a person with id:2 we can : const person = userData.find(user=>user.id===2)
//BUT , this is an iterative method, which iterates through the whole array to find the element
// what if the array has 100,000 users and we need to search every minute for some data ? I becomes a heavy on the runtime.
// with Proxy we can make a wrapper that can optimize our search process: the idea is to convert the array into object with keys corresponding to
// the element's id

const IndexedArray = new Proxy(Array, {
	construct(target, [args]) {
		const index = {};
		//here we'll iterate just ONCE through the array, to create indexes map
		args.forEach((item) => (index[item.id] = item));
		// we shall return a proxy of the array
		return new Proxy(new target(...args), {
			// where we shall re-define some existing methods(push, unshift ...), and
			//define new method (like .findById() for example)
			get(array, prop) {
				switch (prop) {
					case "push":
						return (item) => {
							index[item.id] = item;
							array["push"].call(array, item);
						};
					case "findById":
						return (id) => index[id]; // method using the index map (no iteration)
					default:
						return array[prop];
				}
			},
		});
	},
});

const users = new IndexedArray([
	{ id: 11, name: "John", job: "Front End", age: 30 },
	{ id: 24, name: "Lena", job: "Student", age: 21 },
	{ id: 303, name: "Alan", job: "Back End", age: 35 },
	{ id: 445, name: "Kate", job: "Teacher", age: 26 },
]);

users.push({ id: 984, name: "Lilly", job: "Driver", age: 46 });

console.log("users by id:303 :", users.findById(984));
