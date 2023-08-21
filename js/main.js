import TaskController from "./UI/TaskController";

document.addEventListener("DOMContentLoaded", function () {
    const uiController = new TaskController();
    uiController.renderTaskList(); 
});
