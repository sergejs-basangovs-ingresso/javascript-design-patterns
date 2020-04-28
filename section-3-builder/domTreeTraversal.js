// recursive dom traversal func:
function traversal(node) {
	currentNodeProcessing(node);

	for (const child of node.children) {
		traversal(child);
	}
}

//service functions:
function currentNodeProcessing(node) {
	const text = removeBreakLines(node.textContent);
	if (text.length > 0) console.log("node text: ", text);
}

function removeBreakLines(string) {
	let result = "";
	for (const char of string.trim()) {
		if (char !== " " && char !== "\n") {
			result += char;
		}
	}
	return result;
}
