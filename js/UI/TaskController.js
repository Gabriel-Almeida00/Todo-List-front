import TaskManager from "../services/TaskManager";

class TaskController {
  

  constructor() {
    this.taskManager = new TaskManager();
    this.taskForm = document.getElementById("task-form");
    this.taskTable = document.getElementById("task-table");
    this.filterStatusInput = document.getElementById("filter-status");
    this.selectAllCheckbox = document.getElementById("select-all-checkbox");
    this.changeStatusSelectedBtn = document.getElementById("change-status-selected-btn");

    if (this.taskForm && this.taskTable && this.filterStatusInput && this.selectAllCheckbox && this.changeStatusSelectedBtn) {
      this.taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.addTask();
      });

      this.filterStatusInput.addEventListener("change", () => {
        this.renderTaskList();
      });

      this.selectAllCheckbox.addEventListener("change", () => {
        const taskCheckboxes = document.querySelectorAll(".task-checkbox");
        taskCheckboxes.forEach(checkbox => {
          checkbox.checked = this.selectAllCheckbox.checked;
        });
      });

      this.changeStatusSelectedBtn.addEventListener("click", () => {
        const selectedTaskIndexes = [];
        const taskCheckboxes = document.querySelectorAll(".task-checkbox");

        taskCheckboxes.forEach((checkbox, index) => {
          if (checkbox.checked) {
            selectedTaskIndexes.push(index);
          }
        });

        this.taskManager.updateSelectedTasksStatus(selectedTaskIndexes);
        this.renderTaskList();

        this.selectAllCheckbox.checked = false;
        taskCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
      });

      this.renderTaskList(this.taskManager.getTasks());
    } else {
      console.error("One or more elements are missing on the page.");
    }
  }

  addTask() {
    const taskNameInput = document.getElementById("task-name");
    const taskDescriptionInput = document.getElementById("task-description");
    const taskDueDateInput = document.getElementById("task-due-date");
    const taskPriorityInput = document.getElementById("task-priority");
    const taskCategoryInput = document.getElementById("task-category");
    const taskStatusInput = document.getElementById("task-status");

    const task = {
      name: taskNameInput.value.trim(),
      description: taskDescriptionInput.value.trim(),
      dueDate: taskDueDateInput.value,
      priority: parseInt(taskPriorityInput.value),
      category: taskCategoryInput.value.trim(),
      status: taskStatusInput.value
    };

    if (this.validateTask(task)) {
      this.taskManager.addTask(task);
      this.renderTaskList();
      this.clearInputFields();
  } else {
      alert("Please fill in all required fields.");
  }
}

  validateTask(task) {
    return (
        task.name !== "" &&
        task.description !== "" &&
        task.dueDate !== "" &&
        !isNaN(task.priority) &&
        task.category !== ""
    );
}

clearInputFields() {
  const taskNameInput = document.getElementById("task-name");
  const taskDescriptionInput = document.getElementById("task-description");
  const taskDueDateInput = document.getElementById("task-due-date");
  const taskPriorityInput = document.getElementById("task-priority");
  const taskCategoryInput = document.getElementById("task-category");
  const taskStatusInput = document.getElementById("task-status");

  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  taskDueDateInput.value = "";
  taskPriorityInput.value = "";
  taskCategoryInput.value = "";
  taskStatusInput.value = "todo";
}


  renderTaskList() {
    const filteredTasks = this.taskManager.filterTasksByStatus(this.filterStatusInput.value);

    this.taskTable.innerHTML = "";

    filteredTasks.forEach((task, index) => {
      const taskRow = document.createElement("tr");
      taskRow.innerHTML = `
        <td><input type="checkbox" class="task-checkbox" data-index="${index}"></td>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.category}</td>
        <td>${task.dueDate}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td class="actions">
          <button class="edit-task-btn" data-index="${index}">Editar</button>
          <button class="delete-task-btn" data-index="${index}">Excluir</button>
        </td>
      `;

      this.taskTable.appendChild(taskRow);
    });

    this.setupEditButtons();
    this.setupDeleteButtons();
  }

  setupEditButtons() {
    const editButtons = document.querySelectorAll(".edit-task-btn");
    editButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        this.editTask(index);
      });
    });
  }

  setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-task-btn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        this.deleteTask(index);
      });
    });
  }
}

export default TaskController;
