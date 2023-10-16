

class TaskService {
  constructor(localStorageService) {
    this.tasks = [];
    this.localStorageService = localStorageService;
    this.loadTasksFromLocalStorage();
  }

  saveTasksToLocalStorage() {
    this.localStorageService.save(this.tasks);
  }

  loadTasksFromLocalStorage() {
    const tasksJson = this.localStorageService.load();
    if (tasksJson.length > 0) {
      this.tasks = tasksJson;
    }
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  editTask(index, updatedTask) {
    this.tasks[index] = updatedTask;
    this.saveTasksToLocalStorage();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  updateSelectedTasksStatus(selectedIndexes) {
    selectedIndexes.forEach(index => {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks[index].status = "done";
      }
    });
    this.saveTasksToLocalStorage();
  }

  filterTasksByStatus(status) {
    return status === "all" ? this.tasks : this.tasks.filter(task => task.status === status);
  }

  getTasks() {
    return this.tasks;
  }
}
export default TaskService;