import TaskController from "./Controller/TaskController";

document.addEventListener("DOMContentLoaded", function () {
    const uiController = new TaskController();
    uiController.renderTaskList(); 
});
