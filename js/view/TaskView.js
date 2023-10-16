class TaskView {
    constructor(controller) {
        this.taskController = controller;
        this.initializeElements();
        this.setupEventListeners();
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
        const filteredTasks = this.taskController.filterTasksByStatus(this.filterStatusInput.value);
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

    prepareTaskFormForEdit(index) {
        const task = this.taskController.getTasks()[index];
        const taskForm = document.getElementById("task-form");

        taskForm.querySelector("#task-name").value = task.name;
        taskForm.querySelector("#task-description").value = task.description;
        taskForm.querySelector("#task-due-date").value = task.dueDate;
        taskForm.querySelector("#task-priority").value = task.priority;
        taskForm.querySelector("#task-category").value = task.category;
        taskForm.querySelector("#task-status").value = task.status;

        taskForm.dataset.editingIndex = index;
    }

    addTask() {
        const task = this.getTaskFromForm();
        this.taskController.addTask(task);

        this.renderTaskList();
        this.clearInputFields();
    }

    updateTask() {
        const taskForm = document.getElementById("task-form");
        const index = taskForm.dataset.editingIndex;
        if (index !== undefined) {
            const updatedTask = this.getUpdatedTaskFromForm();
            this.taskController.updateTask(index, updatedTask);

            this.clearInputFields();
            delete taskForm.dataset.editingIndex;
            this.renderTaskList();
        }
    }

    getUpdatedTaskFromForm() {
        const task = this.getTaskFromForm();
        return task;
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

    setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".delete-task-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                this.taskController.deleteTask(index);
                this.renderTaskList();
            });
        });
    }

    changeSelectedTaskStatus() {
        const selectedCheckboxes = document.querySelectorAll('.task-checkbox:checked');
        
        const selectedIndexes = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.getAttribute('data-index')));
        
        this.taskController.changeSelectedTaskStatus(selectedIndexes);
        
        this.renderTaskList();
    }
}
export default TaskView;