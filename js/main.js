import TaskController from "./Controller/TaskController";
import TaskService from "./services/TaskService";
import LocalStorageService from "./services/LocalStorageService";

document.addEventListener("DOMContentLoaded", function () {
  const storageService = new LocalStorageService('tasks');
  const taskService = new TaskService(storageService);
  const uiController = new TaskController(taskService);

  uiController.renderTaskList(); 
});
