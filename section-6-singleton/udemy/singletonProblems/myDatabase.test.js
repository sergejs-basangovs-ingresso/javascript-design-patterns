const {
	MyDatabase,
	DummyDatabase,
	ConfigurableRecordFinder,
} = require("./myDatabase");

describe("singleton database", () => {
	it("should be a singleton", () => {
		const db1 = new MyDatabase();
		const db2 = new MyDatabase();
		expect(db1).toEqual(db2);
	});

	it("should calculate total population correctly", () => {
		const rf = new ConfigurableRecordFinder(new DummyDatabase());
		const cities = ["alpha", "charlie"];
		const total = rf.totalPopulation(cities);
		expect(total).toEqual(1 + 3);
	});
});
