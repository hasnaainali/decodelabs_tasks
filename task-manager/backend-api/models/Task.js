class Task {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  // Get all tasks
  getAll(userId) {
    return this.tasks.filter(task => task.userId === userId);
  }

  // Get single task
  getById(id, userId) {
    return this.tasks.find(task => task.id === parseInt(id) && task.userId === userId);
  }

  // Create new task
  create(taskData, userId) {
    const newTask = {
      id: this.currentId++,
      ...taskData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // Update task
  update(id, taskData, userId) {
    const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id) && task.userId === userId);
    if (taskIndex === -1) return null;
    
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date()
    };
    return this.tasks[taskIndex];
  }

  // Delete task
  delete(id, userId) {
    const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id) && task.userId === userId);
    if (taskIndex === -1) return false;
    
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}

module.exports = new Task();