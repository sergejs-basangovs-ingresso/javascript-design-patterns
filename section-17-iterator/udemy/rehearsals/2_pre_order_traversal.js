//        1
//      /   \
//    2       3
//   / \     / \
//  21  22  31  32

class Node {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
		this.parent = null;
		if (this.left) this.left.parent = this;
		if (this.right) this.right.parent = this;
	}
}

class BinaryTree {
	constructor(root) {
		this.root = root;
	}

	*preOrder() {
		function* traversal(current) {
			// first current node, then - left, then - right:
			yield current;

			// left node:
			if (current.left) {
				for (const leftNode of traversal(current.left)) {
					yield leftNode;
				}
			}

			// right node:
			if (current.right) {
				for (const rightNode of traversal(current.right)) {
					yield rightNode;
				}
			}
		}

		for (const node of traversal(this.root)) {
			yield node;
		}
	}
}

const root = new Node(
	1,
	new Node(2, new Node(21), new Node(22)),
	new Node(3, new Node(31), new Node(32))
);

const binaryTree = new BinaryTree(root);

for (const node of binaryTree.preOrder()) {
	console.log(node.value);
}
