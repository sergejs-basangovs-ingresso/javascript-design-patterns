//abstract factory:
function bmwProducer(kind) {
	return kind === "sport" ? sportCarFactory : familyCarFactory;
}

//factories:
function sportCarFactory() {
	return new Z4();
}

function familyCarFactory() {
	return new I3();
}

class Z4 {
	info = () => "Z4 - is a Sport car.";
}

class I3 {
	info = () => "I3 - is a Family car.";
}

const producer = bmwProducer("sport");
const sportCar = producer();

console.log(sportCar.info());
