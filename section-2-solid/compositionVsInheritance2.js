function flyer({ name }) {
	return {
		fly: () => console.log(`${name} flew.`),
	};
}

function swimmer({ name }) {
	return {
		swim: () => console.log(`${name} swam.`),
	};
}

function attackerAndWalker({ name }) {
	return {
		attack: () => console.log(`${name} attack.`),
		walk: () => console.log(`${name} walk.`),
	};
}

function swimmingMonsterCreator({ name }) {
	const monster = { name: name };
	return {
		...monster,
		...swimmer(monster),
		...attackerAndWalker(monster),
	};
}

function swimmingFlyingMonsterCreator({ name }) {
	const monster = { name: name };
	return {
		...monster,
		...swimmer(monster),
		...flyer(monster),
		...attackerAndWalker(monster),
	};
}

const obj = swimmingFlyingMonsterCreator({ name: "Monster" });
obj.swim();
obj.fly();
obj.attack();
obj.walk();
