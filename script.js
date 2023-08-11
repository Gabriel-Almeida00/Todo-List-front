
const tasks = [];
document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskTable = document.getElementById("task-table");
    const filterStatusInput = document.getElementById("filter-status");
    const selectAllCheckbox = document.getElementById("select-all-checkbox");
    const changeStatusSelectedBtn = document.getElementById("change-status-selected-btn");

    if (taskForm && taskTable && filterStatusInput && selectAllCheckbox && changeStatusSelectedBtn) {
        

        taskForm.addEventListener("submit", function (event) {
            event.preventDefault();
            addTask();
        });

        function addTask() {
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

            if (validateTask(task)) {
                tasks.push(task);
                renderTaskList();
                saveTasksToLocalStorage();
                clearInputFields();
            }
        }

        function validateTask(task) {
            return (
                task.name !== "" &&
                task.description !== "" &&
                task.dueDate !== "" &&
                !isNaN(task.priority) &&
                task.category !== ""
            );
        }

        function renderTaskList() {
            const filteredTasks = filterTasksByStatus(tasks, filterStatusInput.value);
            taskTable.innerHTML = "";

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

                taskTable.appendChild(taskRow);
            });

            setupEditButtons();
            setupDeleteButtons();
        }

        function setupEditButtons() {
            const editButtons = document.querySelectorAll(".edit-task-btn");
            editButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const index = button.getAttribute("data-index");
                    editTask(index);
                });
            });
        }

        function editTask(index) {
            const task = tasks[index];
            const taskNameInput = document.getElementById("task-name");
            const taskDescriptionInput = document.getElementById("task-description");
            const taskDueDateInput = document.getElementById("task-due-date");
            const taskPriorityInput = document.getElementById("task-priority");
            const taskCategoryInput = document.getElementById("task-category");
            const taskStatusInput = document.getElementById("task-status");

            taskNameInput.value = task.name;
            taskDescriptionInput.value = task.description;
            taskDueDateInput.value = task.dueDate;
            taskPriorityInput.value = task.priority;
            taskCategoryInput.value = task.category;
            taskStatusInput.value = task.status;

            tasks.splice(index, 1);
            renderTaskList();
        }

        function setupDeleteButtons() {
            const deleteButtons = document.querySelectorAll(".delete-task-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const index = button.getAttribute("data-index");
                    deleteTask(index);
                });
            });
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTaskList();
        }

        function clearInputFields() {
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

        function filterTasksByStatus(tasks, status) {
            if (status === "all") {
                return tasks;
            } else {
                return tasks.filter(task => task.status === status);
            }
        }

        function loadTasksFromLocalStorage() {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const parsedTasks = JSON.parse(savedTasks);
                tasks.length = 0; 
                Array.prototype.push.apply(tasks, parsedTasks); 
                renderTaskList();
            }
        }

        function saveTasksToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        filterStatusInput.addEventListener("change", () => {
            renderTaskList();
        });

        selectAllCheckbox.addEventListener("change", () => {
            const taskCheckboxes = document.querySelectorAll(".task-checkbox");
            taskCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });

        changeStatusSelectedBtn.addEventListener("click", () => {
            const selectedTaskIndexes = [];
            const taskCheckboxes = document.querySelectorAll(".task-checkbox");

            taskCheckboxes.forEach((checkbox, index) => {
                if (checkbox.checked) {
                    selectedTaskIndexes.push(index);
                }
            });

            selectedTaskIndexes.forEach(index => {
                tasks[index].status = "done";
            });

            renderTaskList();

            selectAllCheckbox.checked = false;
            taskCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        });

        loadTasksFromLocalStorage();

        renderTaskList();

    } else {
        console.error("One or more elements are missing on the page.");
    }
});
