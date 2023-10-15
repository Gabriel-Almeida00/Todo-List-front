
class TaskService {
  constructor(storageService) {
    this.storageService = storageService;
    this.tasks = this.storageService.load('tasks') || [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  editTask(index, updatedTask) {
    this.tasks[index] = updatedTask;
    this.saveTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  updateSelectedTasksStatus(selectedIndexes) {
    selectedIndexes.forEach(index => {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks[index].status = "done";
      }
    });
    this.saveTasks();
  }

  filterTasksByStatus(status) {
    return status === "all" ? this.tasks : this.tasks.filter(task => task.status === status);
  }

  getTasks() {
    return this.tasks;
  }

  saveTasks() {
    this.storageService.save('tasks', this.tasks);
  }
}
export default TaskService;