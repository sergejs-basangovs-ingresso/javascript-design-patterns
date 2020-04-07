const Color = Object.freeze({
	red: "red",
	green: "green",
	blue: "blue",
});

const Size = Object.freeze({
	small: "small",
	medium: "medium",
	large: "large",
});

class Product {
	constructor(name, color, size) {
		this.name = name;
		this.color = color;
		this.size = size;
	}
}

// object must be open for extension, but closed for modification
class ProductFilter {
	filterByColor(products, color) {
		return products.filter((p) => p.color === color);
	}

	filterBySize(products, size) {
		return products.filter((p) => p.size === size);
	}

	filterBySizeAndColor(products, size, color) {
		return products.filter((p) => p.color === color && p.size === size);
	}

	// maybe then you'll need to filter by other criteria, and by other or another criteria and so on...
	// you'll find yourself in an infinite process of writing more and more methods
	// which is not the best approach
	// state space explosion ---> BOOM !!!
}

const apple = new Product("apple", Color.green, Size.small);
const tree = new Product("tree", Color.green, Size.large);
const house = new Product("house", Color.blue, Size.large);

const products = [apple, tree, house];

const pf = new ProductFilter();

console.log(`Green Products: (old way):`);
for (const product of pf.filterByColor(products, Color.green)) {
	console.log(`* ${product.name} - is green.`);
}

//********************************** better way of doing: **********************************

// what we can do instead:
class ColorSpecification {
	constructor(color) {
		this.color = color;
	}

	isSatisfied(item) {
		return item.color === this.color;
	}
}

class SizeSpecification {
	constructor(size) {
		this.size = size;
	}

	isSatisfied(item) {
		return item.size === this.size;
	}
}
// here we do not need to change the filter class every time we want to add new filtering criteria,
// for new filtering criteria - we just create a new class like above (ColorSpecification, SizeSpecification, etc...)
class BetterFilter {
	filter(items, spec) {
		return items.filter((x) => spec.isSatisfied(x));
	}
}

const bf = new BetterFilter();
const productsByColor = bf.filter(
	products,
	new ColorSpecification(Color.green)
);

console.log("Green Products (new way):");

for (const product of productsByColor) {
	console.log(`* ${product.name} - is green`);
}

class AndSpecification {
	constructor(...specs) {
		this.specs = specs;
	}

	isSatisfied(item) {
		return this.specs.every((x) => x.isSatisfied(item));
	}
}

console.log("Green and Large Products:");
const specs = new AndSpecification(
	new ColorSpecification(Color.green),
	new SizeSpecification(Size.large)
);

const productsByColorAndSize = bf.filter(products, specs);
for (const p of productsByColorAndSize) {
	console.log(`* ${p.name} - is green and large`);
}

class OrSpecification {
	constructor(...specs) {
		this.specs = specs;
	}

	isSatisfied(item) {
		return this.specs.some((x) => x.isSatisfied(item));
	}
}

const specsOr = new OrSpecification(
	new ColorSpecification(Color.blue),
	new SizeSpecification(Size.large)
);
const productsByColorOrSize = bf.filter(products, specsOr);

console.log("Blue OR Large Products:");

for (const p of productsByColorOrSize) {
	console.log(`* ${p.name} - is either blue or large.`);
}
