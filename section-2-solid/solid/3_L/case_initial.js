class Component {
	render() {
		return `
    <div>Component</div>
    `;
	}
}

class Header extends Component {
	onInit() {}
}

class Footer extends Component {
	afterInit() {}
}

class HOC extends Component {
	render() {
		//here again we are breaching the Liskov Substitution Principle
		throw new Error("No render method in HOC");
	}

	wrapComponent(component) {
		component.wrapped = true;
		return component;
	}
}

function renderComponent(component) {
	console.log(component.render());
}

renderComponent(new Header());
renderComponent(new Footer());
