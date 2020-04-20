class AutoNews {
	constructor() {
		this.news = "";
		this.actions = [];
	}

	setNews(text) {
		this.news = text;
		this.notifyAll();
	}

	notifyAll() {
		this.actions.forEach((subscriber) => {
			subscriber.inform(this);
		});
	}

	register(observer) {
		this.actions.push(observer);
	}

	unregister(observer) {
		this.actions = this.actions.filter((element) => {
			return !(element instanceof observer.constructor);
		});
	}
}

//create subscribers:
class Jack {
	inform(sender) {
		console.log(`Jack has been informed about ${sender.news}`);
	}
}

class Max {
	inform(sender) {
		console.log(`Max has been informed about ${sender.news}`);
	}
}

const autoNews = new AutoNews();
const jack = new Jack();
const max = new Max();
autoNews.register(jack);
autoNews.register(max);

autoNews.setNews("New Tesla price is $40,000");
console.log(JSON.stringify(autoNews.actions, null, 2));

autoNews.unregister(max);
autoNews.setNews("New Mercedes SUV G900 price is $75,000");
