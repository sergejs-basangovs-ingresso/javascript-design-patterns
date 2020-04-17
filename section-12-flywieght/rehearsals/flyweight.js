// flyweight class:
class Folder {
	constructor(category) {
		this.category = category;
		this.files = [];
	}

	add(file) {
		this.files.push(file);
	}
}

// flyweight factory:
class FolderFactory {
	constructor() {
		this.folders = {};
	}

	newFolder(category) {
		if (this.folders[category]) {
			return this.folders[category];
		}
		console.count("new folder");
		this.folders[category] = new Folder(category);
		return this.folders[category];
	}

	getFolders() {
		console.table(this.folders);
	}
}

const factory = new FolderFactory();

tax_declaration = {};
project_cashflow = {};

tax_declaration[2018] = factory.newFolder("Tax");
tax_declaration[2019] = factory.newFolder("Tax");
tax_declaration[2020] = factory.newFolder("Tax");

project_cashflow[2018] = factory.newFolder("Cashflow");
project_cashflow[2019] = factory.newFolder("Cashflow");
project_cashflow[2020] = factory.newFolder("Cashflow");

factory.getFolders();

console.table(tax_declaration);
console.table(project_cashflow);
