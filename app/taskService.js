let tasks = [];

function addTask(name) {
  const task = { id: Date.now(), name }; 
  tasks.push(task);
  return task;
}

function getTasks() {
  return tasks;
}

function updateTask(id, newName) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.name = newName;
    return task;
  }
  return null;
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
}

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask
};
