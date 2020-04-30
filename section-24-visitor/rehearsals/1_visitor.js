class Employee {
	constructor(name, position, salary) {
		this.name = name;
		this.position = position;
		this._salary = salary;
	}

	get salary() {
		return this._salary;
	}

	set salary(val) {
		this._salary = val;
	}

	accept(visitor) {
		visitor.collectEmployeeInfo(this);
	}
}

class Statistics {
	constructor() {
		this.data = [];
	}

	collectEmployeeInfo(employee) {
		this.data.push(
			`${employee.name} / ${employee.position} / £${employee.salary} annual`
		);
		return this;
	}

	raiseSalary(employee, amount) {
		employee.salary += amount;
		return this;
	}

	print() {
		console.log(this.data.join("\n"));
	}
}

const e1 = new Employee("Johnny", "Junior Software Developer", 40000);
const e2 = new Employee("Peter", "Senior Software Developer", 60000);
const e3 = new Employee("Mia", "Product Owner", 50000);
const e4 = new Employee("Franz-August", "CEO", 80000);
const stats = new Statistics();
stats
	.collectEmployeeInfo(e1)
	.collectEmployeeInfo(e2)
	.collectEmployeeInfo(e3)
	.collectEmployeeInfo(e4);
stats.print();

stats.raiseSalary(e1, 5000).raiseSalary(e2, 3000);
stats
	.collectEmployeeInfo(e1)
	.collectEmployeeInfo(e2)
	.collectEmployeeInfo(e3)
	.collectEmployeeInfo(e4);
stats.print();
