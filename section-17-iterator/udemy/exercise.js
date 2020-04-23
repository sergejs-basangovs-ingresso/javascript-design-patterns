class Node {
	constructor(value, left = null, right = null) {
		// todo
		this.value = value;
		this.left = left;
		this.right = right;
		this.parent = null;
		if (this.left) this.left.parent = this;
		if (this.right) this.right.parent = this;
	}

	*preorder() {
		// todo
		function* traverse(current) {
			// traverse current , then left then right:
			yield current;

			//then left:
			if (current.left) {
				for (const left of traverse(current.left)) {
					yield left;
				}
			}

			//then right:
			if (current.right) {
				for (const right of traverse(current.right)) {
					yield right;
				}
			}
		}

		for (const node of traverse(this)) {
			yield node.value;
		}
	}
}

const root = new Node(1, new Node(2), new Node(3));

for (const node of root.preorder()) {
	console.log(node);
}

//        1
//    2       3
//  4  41  50   5
