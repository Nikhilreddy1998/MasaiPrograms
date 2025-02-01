let tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];



let updatedTasks = new Array(tasks.length - 1);
for (let i = 1; i < tasks.length; i++) {
  updatedTasks[i - 1] = tasks[i];
}


updatedTasks = ["High Priority Task 1", "High Priority Task 2", ...updatedTasks];


updatedTasks[updatedTasks.length - 1] = "New Task";


console.log("Updated Task List:", updatedTasks);
