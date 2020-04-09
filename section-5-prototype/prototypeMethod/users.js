const Shopper = require("./shopper");

const john = new Shopper("John");
//common items:
john.addItemToList("sleeping bag");
john.addItemToList("backpack");
john.addItemToList("torchlight");
john.addItemToList("water flask");
//individual selection:
john.addItemToList("size XXL trousers");

const jane = new Shopper("Jane");
//common items:
jane.addItemToList("sleeping bag");
jane.addItemToList("backpack");
jane.addItemToList("torchlight");
jane.addItemToList("water flask");
//individual selection:
jane.addItemToList("size S trousers");
jane.addItemToList("book `How to find friends in the hills`");

console.log(`${john.name}: ${john.shopping_list}`);
console.log(`${jane.name}: ${jane.shopping_list}`);

// So we shall try to make that commonly selected items are making part of base selection when the object is created
// by using the Shopper object prototype
