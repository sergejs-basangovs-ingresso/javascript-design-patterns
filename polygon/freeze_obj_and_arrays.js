// Object.freeze() - will make objects and arrays not mutable.

const obj_1 = {
	foo: 1,
	baz: 2,
};

const arr_1 = ["foo", "baz"];

Object.freeze(obj_1);
Object.freeze(arr_1);

obj_1.foo = 144;
obj_1.bar = 22;
arr_1.push("bar");

console.log(obj_1);
console.log(arr_1);
