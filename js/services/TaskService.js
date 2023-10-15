import TaskLocalStorage from './LocalStorageService';


class TaskService {
  constructor() {
    this.tasks = TaskLocalStorage.loadTasks();
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
    TaskLocalStorage.saveTasks(this.tasks);
  }
}
export default TaskService;