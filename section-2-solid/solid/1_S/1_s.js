// Single Responsibility Principle:
class News {
	constructor(title, text) {
		this.title = title;
		this.text = text;
		this.modified = false;
	}

	update(text) {
		this.text = text;
		this.modified = true;
	}

	//breaching the Single Responsibility Principle
	// toHtml() {
	// 	return `
	//   <div class="news">
	//     <h1>${this.title}</h1>
	//     <p>${this.text}</p>
	//   </div>
	//   `;
	// }

	// //breaching the Single Responsibility Principle
	// toJson() {
	// 	return JSON.stringify(this, null, 2);
	// }
}

// for that purpose we shall create print news class, and keep the News class for the news data only
class NewsPrinter {
	constructor(news) {
		this.news = news;
	}

	html() {
		return `
    <div class="news">
      <h1>${this.news.title}</h1>
      <p>${this.news.text}</p>
    </div>
    `;
	}

	json() {
		return JSON.stringify(this.news, null, 2);
	}

	xml() {
		return `
    <news>
      <title>${this.news.title}</title>
      <text>${this.news.text}</text>
    </news>
    `;
	}
}

const news = new News("Johnny Pony", "Dancing in the rain, again.");
const printer = new NewsPrinter(news);

console.log(printer.html());
console.log(printer.json());
console.log(printer.xml());
