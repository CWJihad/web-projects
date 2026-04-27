const fs = require("fs"); // fs = fileSystem

const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};
// console.log(typeof loadTasks()); //object

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added: ", task);
  // console.log(typeof {task}); //object
};

const showTask = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("Tasks are empty!");
    return;
  }

  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));

  // console.log(tasks.toString() !== "");
  // console.log(typeof tasks);
};

const removeTask = (indexToRemove) => {
  const tasks = loadTasks();
  const targetIndex = indexToRemove - 1;
  if (targetIndex < 0 || targetIndex >= tasks.length) {
    console.log(`Error: Task number ${indexToRemove} does not exit.`);
    return;
  }

  const newTasks = tasks.filter((task, index) => index !== targetIndex);
  saveTasks(newTasks);
  console.log(`Task ${indexToRemove} removed successfully`);
};

const command = process.argv[2]; // in terminal we saw we are giving command in 2no index
const arg = process.argv[3]; // in terminal we saw we are giving task in 3no index

if (command === "add") {
  addTask(arg);
} else if (command === "show") {
  showTask();
} else if (command === "remove") {
  removeTask(parseInt(arg));
} else {
  console.log("Command not found !");
}
