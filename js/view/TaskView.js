class TaskView {
    constructor(controller, emailObserver) {
        this.taskController = controller;
        this.emailObserver = emailObserver
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
            email: document.getElementById("email"),
            notifyOnDueDate: document.getElementById("notify-on-due-date"),
            notifyOnComplete: document.getElementById("notify-on-complete"),
            notifyOnPending: document.getElementById("notify-on-pending"),
        };
    
        const task = {
            name: elements.name.value.trim(),
            description: elements.description.value.trim(),
            dueDate: elements.dueDate.value,
            priority: parseInt(elements.priority.value),
            category: elements.category.value.trim(),
            status: elements.status.value,
            emailNotification: {
                email: elements.email.value,
                checkDueDate: elements.notifyOnDueDate.checked,
                checkTaskDone: elements.notifyOnComplete.checked,
                checkTaskPending: elements.notifyOnPending.checked,
            },
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
        const emailInput = document.getElementById("email");
        const notifyOnDueDateInput = document.getElementById("notify-on-due-date");
        const notifyOnCompleteInput = document.getElementById("notify-on-complete");
        const notifyOnPendingInput = document.getElementById("notify-on-pending");
    
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
        taskDueDateInput.value = "";
        taskPriorityInput.value = "";
        taskCategoryInput.value = "";
        taskStatusInput.value = "todo";
    
        emailInput.value = "";
        notifyOnDueDateInput.checked = false;
        notifyOnCompleteInput.checked = false;
        notifyOnPendingInput.checked = false;
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

        this.emailObserver.sendEmailsBasedOnEvents(filteredTasks);
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
    
        const emailInput = document.getElementById("email");
        emailInput.value = task.emailNotification.email;
    
        const notifyOnDueDateCheckbox = document.getElementById("notify-on-due-date");
        notifyOnDueDateCheckbox.checked = task.emailNotification.checkDueDate;
    
        const notifyOnCompleteCheckbox = document.getElementById("notify-on-complete");
        notifyOnCompleteCheckbox.checked = task.emailNotification.checkTaskDone;
    
        const notifyOnPendingCheckbox = document.getElementById("notify-on-pending");
        notifyOnPendingCheckbox.checked = task.emailNotification.checkTaskPending;
    
        taskForm.dataset.editingIndex = index;
    }
    

    addTask() {
        const task = this.getTaskFromForm();
        this.taskController.addTask(task);
        this.emailObserver.addObserver(task);

        this.renderTaskList();
        this.clearInputFields();
    }

    updateTask() {
        const taskForm = document.getElementById("task-form");
        const index = taskForm.dataset.editingIndex;
        if (index !== undefined) {
            const updatedTask = this.getUpdatedTaskFromForm();
            this.taskController.updateTask(index, updatedTask);
            this.emailObserver.addObserver(updatedTask);

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