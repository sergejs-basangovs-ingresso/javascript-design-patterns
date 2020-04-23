//      1
//     / \
//    2   3

// in-order: 213
// pre-order: 123
// post-order: 231

class Node {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
		this.parent = null;
		if (this.left) {
			this.left.parent = this;
		}

		if (this.right) {
			this.right.parent = this;
		}
	}
}

function makeInOrderIterator(root) {
	let current = root;
	while (current.left) {
		current = current.left; // we go to the most left- bottom node
	}
	//flag whether or not I have yielded the starting value:
	let yieldedStart = false;
	return {
		next: function () {
			if (!yieldedStart) {
				yieldedStart = true;
				return {
					value: current,
					done: false,
				};
			}
			if (current.right) {
				current = current.right;
				while (current.left) {
					current = current.left;
				}
				return {
					value: current,
					done: false,
				};
			} else {
				let p = current.parent;
				while (p && current === p.right) {
					current = p;
					p = p.parent;
				}
				current = p;
				return {
					value: current,
					done: current === null,
				};
			}
		},
		[Symbol.iterator]: function () {
			return this;
		},
	};
}

class BinaryTree {
	constructor(rootNode) {
		this.rootNode = rootNode;
	}

	[Symbol.iterator]() {
		return makeInOrderIterator(this.rootNode);
	}

	*betterInOrder() {
		function* traverse(current) {
			//traverse the left part, then traverse right part:
			if (current.left) {
				for (const left of traverse(current.left)) {
					yield left;
				}
			}
			//then yield current element:
			yield current;
			//then go to the right:
			if (current.right) {
				for (const right of traverse(current.right)) {
					yield right;
				}
			}
		}
		for (const node of traverse(this.rootNode)) {
			yield node;
		}
	}
}

const root = new Node(1, new Node(2), new Node(3));

for (const node of new BinaryTree(root).betterInOrder()) {
	console.log(node.value);
}
