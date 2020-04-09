const Shopper = require("./newShopper");

const standard = new Shopper();
//common items:
standard.addItemToList("sleeping bag");
standard.addItemToList("backpack");
standard.addItemToList("torchlight");
standard.addItemToList("water flask");

const john = standard.clone();
const jane = standard.clone();
john.name = "John";
jane.name = "Jane";

//individual selection:
john.addItemToList("size XXL trousers");

//individual selection:
jane.addItemToList("size S trousers");
jane.addItemToList("book `How to find friends in the hills`");

console.log(`${john.name}: ${john.shopping_list}`);
console.log(`${jane.name}: ${jane.shopping_list}`);

// So we shall try to make that commonly selected items are making part of base selection when the object is created
// by using the Shopper object prototype
