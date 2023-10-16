import TaskController from "./Controller/TaskController";
import TaskService from "./services/TaskService";
import LocalStorageService from "./services/LocalStorageService";
import TaskValidation from "./validation/TaskValidation";
import TaskView from "./view/TaskView";

document.addEventListener("DOMContentLoaded", function () {
  const storageService = new LocalStorageService('tasks');
  const taskService = new TaskService(storageService);
  const taskValidation = new TaskValidation();
  const taskController = new TaskController(taskService, taskValidation);
  const taskView = new TaskView(taskController);

  taskView.renderTaskList();
});
