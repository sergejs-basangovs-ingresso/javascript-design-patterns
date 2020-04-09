// Let’s have a look at a very simple example of using the factory pattern to assemble an alligator object.
// To do that we first need to make factories that create the alligator parts for us:

class TailFactory {
	constructor(props) {
		this.tailLength = props.tailLength;
	}
}

class TorsoFactory {
	constructor(props) {
		this.color = props.color;
	}
}

class HeadFactory {
	constructor(props) {
		this.snoutLength = props.snoutLength;
	}
}

// Now, we create a class that acts as an intermediary between the
// actual factories classes and the user. Let’s call this the AlligatorPartsFactory:

class AlligatorPartsFactory {
	constructor(type, props) {
		switch (type) {
			case "tail":
				return new TailFactory(props);
			case "torso":
				return new TorsoFactory(props);
			case "head":
				return new HeadFactory(props);
			default:
				throw new Error(
					"1st argument `type` - values accepted: tail, torso, head"
				);
		}
	}
}

// Let’s go ahead and assemble the actual alligator now and use
// the AlligatorPartsFactory to get the required parts for us:

const alligator = {};
const alligatorProps = {
	tailLength: 3,
	color: "green",
	snoutLength: 1.5,
};

alligator.tail = new AlligatorPartsFactory("tail", alligatorProps);
alligator.torso = new AlligatorPartsFactory("torso", alligatorProps);
alligator.head = new AlligatorPartsFactory("head", alligatorProps);

console.log(alligator);
