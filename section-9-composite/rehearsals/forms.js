class Document {
	constructor(title) {
		this.title = title;
		this.signature = null;
	}

	sign(signature) {
		this.signature = signature;
	}
}

class DocumentComposite {
	constructor(title) {
		this.items = [];
		if (title) this.items.push(new Document(title));
	}

	add(item) {
		this.items.push(item);
	}

	sign(signature) {
		this.items.forEach((item) => {
			item.sign(signature);
		});
	}
}

const form = new DocumentComposite();
const pr2Form = new Document("Principal Product Progress Report(PR2");
const w2Form = new Document("Revenue Service Tax Return Form(W2)");
const w3Form = new Document(
	"Revenue Service Current Year Tax Rollover Report Form(W2)"
);
const wForm = new DocumentComposite(
	"Revenue Service Corporate Activities Form(W53)"
);

wForm.add(w2Form);
wForm.add(w3Form);
form.add(wForm);
form.add(pr2Form);

wForm.sign("Johnny Pony / Accountant.");
pr2Form.sign("Madame Coucou / Commercial Director.");

console.log(JSON.stringify(form, null, 2));
