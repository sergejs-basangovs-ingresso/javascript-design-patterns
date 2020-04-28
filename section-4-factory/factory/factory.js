class BasicMembership {
	constructor(name) {
		this.name = name;
		this.type = "basic";
		this.cost = 50;
	}
	//some other Basic specific methods
}

class StandardMembership {
	constructor(name) {
		this.name = name;
		this.type = "standard";
		this.cost = 150;
	}
	//some other Standard specific methods
}

class PremiumMembership {
	constructor(name) {
		this.name = name;
		this.type = "premium";
		this.cost = 500;
	}
	//some other Premium specific methods
}

class MembershipFactory {
	static list = {
		basic: BasicMembership,
		standard: StandardMembership,
		premium: PremiumMembership,
	};

	create(name, type = "basic") {
		const Membership =
			MembershipFactory.list[type] || MembershipFactory.list.basic;
		return new Membership(name);
	}
}

const factory = new MembershipFactory();
const members = [
	factory.create("Johnny Pony", "premium"),
	factory.create("Mony Pony", "basic"),
	factory.create("Macka Rony", "standard"),
	factory.create("Horny Benny"),
];

console.log(JSON.stringify(members, null, 2));
