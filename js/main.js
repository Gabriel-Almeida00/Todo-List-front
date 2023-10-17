import TaskView from "./view/TaskView";
import TaskController from "./Controller/TaskController";

import TaskService from "./services/TaskService";
import EmailService from "./services/EmailService";
import LocalStorageService from "./services/LocalStorageService";

import TaskValidation from "./validation/TaskValidation";

import EmailObserver from "./observer/EmailObserver";

document.addEventListener("DOMContentLoaded", function () {
  const taskValidation = new TaskValidation();
  const emailService = new EmailService();
  const emailObserver = new EmailObserver(emailService);

  const storageService = new LocalStorageService('tasks');
  const taskService = new TaskService(storageService);


  const taskController = new TaskController(taskService, taskValidation);
  const taskView = new TaskView(taskController, emailObserver);

  taskView.renderTaskList();
});
