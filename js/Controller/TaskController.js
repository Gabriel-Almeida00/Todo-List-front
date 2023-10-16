
class TaskController {
  constructor(taskService, taskValidation) {
    this.taskService = taskService;
    this.taskValidation = taskValidation;
  }

  addTask(task) {
    if (this.taskValidation.validateTask(task)) {
      this.taskService.addTask(task);
    }
  }

  updateTask(index, updatedTask) {
    if (this.taskValidation.validateTask(updatedTask)) {
      this.taskService.editTask(index, updatedTask);
    }
  }

  deleteTask(index) {
    this.taskService.deleteTask(index);
  }

  changeSelectedTaskStatus(selectedIndexes) {
    this.taskService.updateSelectedTasksStatus(selectedIndexes);
  }

  filterTasksByStatus(status) {
    return this.taskService.filterTasksByStatus(status);
  }

  getTasks() {
    return this.taskService.getTasks();
  }
}

export default TaskController;