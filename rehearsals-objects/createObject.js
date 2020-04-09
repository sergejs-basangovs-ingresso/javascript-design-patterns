const task = Object.create(Object.prototype);
const title = "title";

task[title] = "My Title";
task.description = "My Task";
task.toString = () => this.title + " / " + this.description;

console.log(task);

console.log(task.toString());
