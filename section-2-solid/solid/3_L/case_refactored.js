class Component {
	// will keep some component base functionality...
	isComponent = true;
}

class ComponentWithTemplate extends Component {
	render() {
		return `
    <div>Component</div>
    `;
	}
}

class HigherOrderComponent extends Component {}

class Header extends ComponentWithTemplate {
	onInit() {}
}

class Footer extends ComponentWithTemplate {
	afterInit() {}
}

class HOC extends HigherOrderComponent {
	wrapComponent(component) {
		component.wrapped = true;
		return component;
	}
}

function renderComponent(componentWithTemplate) {
	console.log(componentWithTemplate.render());
}

renderComponent(new Header());
renderComponent(new Footer());
