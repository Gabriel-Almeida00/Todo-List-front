
class TaskController {
  constructor(taskService) {
    this.taskManager = taskService;
    this.initializeElements();
  }

  initializeElements() {
    this.taskForm = document.getElementById("task-form");
    this.taskTable = document.getElementById("task-table");
    this.filterStatusInput = document.getElementById("filter-status");
    this.selectAllCheckbox = document.getElementById("select-all-checkbox");
    this.changeStatusSelectedBtn = document.getElementById("change-status-selected-btn");

    if (this.taskForm && this.taskTable && this.filterStatusInput && this.selectAllCheckbox && this.changeStatusSelectedBtn) {
      this.setupEventListeners();
      this.renderTaskList();
    } else {
      console.error("One or more elements are missing on the page.");
    }
  }

  setupEventListeners() {
    document.getElementById("add-task").addEventListener("click", () => {
      this.addTask();
    });
  
    document.getElementById("update-task").addEventListener("click", () => {
      this.updateTask();
    });
  
    this.filterStatusInput.addEventListener("change", () => {
      this.renderTaskList();
    });
  
    this.selectAllCheckbox.addEventListener("change", () => {
      this.toggleSelectAll();
    });
  
    this.changeStatusSelectedBtn.addEventListener("click", () => {
      this.changeSelectedTaskStatus();
    });
  }
  


  addTask() {
    const task = this.getTaskFromForm();
  
    if (this.isValidTask(task)) {
      this.taskManager.addTask(task);
      this.renderTaskList();
      this.clearInputFields();
    }
  }
  
  getTaskFromForm() {
    const elements = {
      name: document.getElementById("task-name"),
      description: document.getElementById("task-description"),
      dueDate: document.getElementById("task-due-date"),
      priority: document.getElementById("task-priority"),
      category: document.getElementById("task-category"),
      status: document.getElementById("task-status"),
    };
  
    const task = {
      name: elements.name.value.trim(),
      description: elements.description.value.trim(),
      dueDate: elements.dueDate.value,
      priority: parseInt(elements.priority.value),
      category: elements.category.value.trim(),
      status: elements.status.value,
    };
  
    return task;
  }
  
  isValidTask(task) {
    if (!this.validatePriority(task.priority)) {
      alert("Nível de prioridade inválido.");
      return false;
    }
  
    if (!this.validateDueDate(task.dueDate)) {
      alert("Data de término inválida ou menor que a data atual.");
      return false;
    }
  
    if (!this.validateTask(task)) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
  
    return true;
  }
  

  getUpdatedTaskFromForm() {
    const task = this.getTaskFromForm();
  
    if (!this.isValidTask(task)) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return null; 
    }
  
    return task;
  }
  


validatePriority(priority) {
  const priorityRegex = /^[1-5]$/;
  return priorityRegex.test(priority);
}

validateDueDate(dueDate) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dueDate)) {
    return false;
  }

  const currentDate = new Date();
  const inputDate = new Date(dueDate);

  return inputDate >= currentDate;
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
  const fragment = document.createDocumentFragment();

  filteredTasks.forEach((task, index) => {
    const taskRow = this.createTaskRow(task, index);
    fragment.appendChild(taskRow);
  });

  this.taskTable.innerHTML = "";
  this.taskTable.appendChild(fragment);

  this.setupEditButtons();
  this.setupDeleteButtons();
}

createTaskRow(task, index) {
  const row = document.createElement("tr");

  row.innerHTML = `
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

  return row;
}


  setupEditButtons() {
    const editButtons = document.querySelectorAll(".edit-task-btn");
    editButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        this.prepareTaskFormForEdit(index);
      });
    });
  }

  prepareTaskFormForEdit(index) {
    const task = this.taskManager.getTasks()[index];
    const taskForm = document.getElementById("task-form");

    taskForm.querySelector("#task-name").value = task.name;
    taskForm.querySelector("#task-description").value = task.description;
    taskForm.querySelector("#task-due-date").value = task.dueDate;
    taskForm.querySelector("#task-priority").value = task.priority;
    taskForm.querySelector("#task-category").value = task.category;
    taskForm.querySelector("#task-status").value = task.status;

    taskForm.dataset.editingIndex = index;
  }

  updateTask() {
    const taskForm = document.getElementById("task-form");
    const index = taskForm.dataset.editingIndex;
    if (index !== undefined) {
      const updatedTask = this.getUpdatedTaskFromForm();
      this.taskManager.editTask(index, updatedTask);
      this.clearInputFields();
      delete taskForm.dataset.editingIndex;
      this.renderTaskList();
    }
  }

  setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-task-btn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        this.taskManager.deleteTask(index); 
        this.renderTaskList(); 
      });
    });
  }
}

export default TaskController;