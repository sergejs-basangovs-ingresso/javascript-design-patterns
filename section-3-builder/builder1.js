const words = ["hello", "world"];
const html = [];
html.push("<ul>\n");
for (const word of words) {
	html.push(`  <li>${word}</li>\n`);
}
html.push("</ul>");
console.log(html.join(""));
