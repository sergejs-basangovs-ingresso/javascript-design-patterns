class GameNews {
	constructor() {
		this.news = "";
		this.subscribers = [];
	}

	writeNews(text) {
		this.news = text;
		this.sendToAll();
	}

	sendToAll() {
		this.subscribers.forEach((user) => {
			user.sendNews(this.news);
		});
	}

	subscribe(user) {
		this.subscribers.push(user);
	}

	unsubscribe(user) {
		this.subscribers = this.subscribers.filter(
			(subscriber) => subscriber.id !== user.id
		);
	}
}

class BasicUser {
	constructor(name) {
		this.name = name;
		this.id = Math.floor(new Date().getMilliseconds() * Math.random());
		this.type = "basic";
		this.news = [];
	}

	sendNews(newsletter) {
		if (this.news.indexOf(newsletter) === -1) {
			console.log(`${this.name} has received the news: ${newsletter}`);
			this.news.push(newsletter);
		} else {
			console.log(`${this.name} already received this newsletter`);
		}
	}

	toString() {
		return JSON.stringify(this, null, 2);
	}
}

const gameNews = new GameNews();

const john = new BasicUser("John");
const lena = new BasicUser("Lena");
const news = [
	"New Far Cry 5 release preview.",
	"The RPG Witcher 4 `The Tower of Zirael` release preview.",
];

gameNews.subscribe(john);
gameNews.subscribe(lena);
gameNews.writeNews(news[0]);

gameNews.unsubscribe(john);
gameNews.writeNews(news[1]);

gameNews.subscribe(john);
gameNews.writeNews(news[1]);

console.log("john :", john);
console.log("lena :", lena);
