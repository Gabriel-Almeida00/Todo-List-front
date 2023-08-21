/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/UI/TaskController.js":
/*!*********************************!*\
  !*** ./js/UI/TaskController.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_TaskManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/TaskManager */ \"./js/services/TaskManager.js\");\n\n\nclass TaskController {\n  \n\n  constructor() {\n    this.taskManager = new _services_TaskManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.taskForm = document.getElementById(\"task-form\");\n    this.taskTable = document.getElementById(\"task-table\");\n    this.filterStatusInput = document.getElementById(\"filter-status\");\n    this.selectAllCheckbox = document.getElementById(\"select-all-checkbox\");\n    this.changeStatusSelectedBtn = document.getElementById(\"change-status-selected-btn\");\n\n    if (this.taskForm && this.taskTable && this.filterStatusInput && this.selectAllCheckbox && this.changeStatusSelectedBtn) {\n      this.taskForm.addEventListener(\"submit\", (event) => {\n        event.preventDefault();\n        this.addTask();\n      });\n\n      this.filterStatusInput.addEventListener(\"change\", () => {\n        this.renderTaskList();\n      });\n\n      this.selectAllCheckbox.addEventListener(\"change\", () => {\n        const taskCheckboxes = document.querySelectorAll(\".task-checkbox\");\n        taskCheckboxes.forEach(checkbox => {\n          checkbox.checked = this.selectAllCheckbox.checked;\n        });\n      });\n\n      this.changeStatusSelectedBtn.addEventListener(\"click\", () => {\n        const selectedTaskIndexes = [];\n        const taskCheckboxes = document.querySelectorAll(\".task-checkbox\");\n\n        taskCheckboxes.forEach((checkbox, index) => {\n          if (checkbox.checked) {\n            selectedTaskIndexes.push(index);\n          }\n        });\n\n        this.taskManager.updateSelectedTasksStatus(selectedTaskIndexes);\n        this.renderTaskList();\n\n        this.selectAllCheckbox.checked = false;\n        taskCheckboxes.forEach(checkbox => {\n          checkbox.checked = false;\n        });\n      });\n\n      this.renderTaskList(this.taskManager.getTasks());\n    } else {\n      console.error(\"One or more elements are missing on the page.\");\n    }\n  }\n\n  addTask() {\n    const taskNameInput = document.getElementById(\"task-name\");\n    const taskDescriptionInput = document.getElementById(\"task-description\");\n    const taskDueDateInput = document.getElementById(\"task-due-date\");\n    const taskPriorityInput = document.getElementById(\"task-priority\");\n    const taskCategoryInput = document.getElementById(\"task-category\");\n    const taskStatusInput = document.getElementById(\"task-status\");\n\n    const task = {\n      name: taskNameInput.value.trim(),\n      description: taskDescriptionInput.value.trim(),\n      dueDate: taskDueDateInput.value,\n      priority: parseInt(taskPriorityInput.value),\n      category: taskCategoryInput.value.trim(),\n      status: taskStatusInput.value\n    };\n\n    if (this.validateTask(task)) {\n      this.taskManager.addTask(task);\n      this.renderTaskList();\n      this.clearInputFields();\n  } else {\n      alert(\"Please fill in all required fields.\");\n  }\n}\n\n  validateTask(task) {\n    return (\n        task.name !== \"\" &&\n        task.description !== \"\" &&\n        task.dueDate !== \"\" &&\n        !isNaN(task.priority) &&\n        task.category !== \"\"\n    );\n}\n\nclearInputFields() {\n  const taskNameInput = document.getElementById(\"task-name\");\n  const taskDescriptionInput = document.getElementById(\"task-description\");\n  const taskDueDateInput = document.getElementById(\"task-due-date\");\n  const taskPriorityInput = document.getElementById(\"task-priority\");\n  const taskCategoryInput = document.getElementById(\"task-category\");\n  const taskStatusInput = document.getElementById(\"task-status\");\n\n  taskNameInput.value = \"\";\n  taskDescriptionInput.value = \"\";\n  taskDueDateInput.value = \"\";\n  taskPriorityInput.value = \"\";\n  taskCategoryInput.value = \"\";\n  taskStatusInput.value = \"todo\";\n}\n\n\nfilterTasksByStatus(tasks, status) {\n  return status === \"all\" ? tasks : tasks.filter(task => task.status === status);\n}\n\n\n  renderTaskList() {\n    const filteredTasks = this.taskManager.filterTasksByStatus(this.filterStatusInput.value);\n\n    this.taskTable.innerHTML = \"\";\n\n    filteredTasks.forEach((task, index) => {\n      const taskRow = document.createElement(\"tr\");\n      taskRow.innerHTML = `\n        <td><input type=\"checkbox\" class=\"task-checkbox\" data-index=\"${index}\"></td>\n        <td>${task.name}</td>\n        <td>${task.description}</td>\n        <td>${task.category}</td>\n        <td>${task.dueDate}</td>\n        <td>${task.priority}</td>\n        <td>${task.status}</td>\n        <td class=\"actions\">\n          <button class=\"edit-task-btn\" data-index=\"${index}\">Editar</button>\n          <button class=\"delete-task-btn\" data-index=\"${index}\">Excluir</button>\n        </td>\n      `;\n\n      this.taskTable.appendChild(taskRow);\n    });\n\n    this.setupEditButtons();\n    this.setupDeleteButtons();\n  }\n\n  setupEditButtons() {\n    const editButtons = document.querySelectorAll(\".edit-task-btn\");\n    editButtons.forEach(button => {\n      button.addEventListener(\"click\", () => {\n        const index = button.getAttribute(\"data-index\");\n        this.editTask(index);\n      });\n    });\n  }\n\n  setupDeleteButtons() {\n    const deleteButtons = document.querySelectorAll(\".delete-task-btn\");\n    deleteButtons.forEach(button => {\n      button.addEventListener(\"click\", () => {\n        const index = button.getAttribute(\"data-index\");\n        this.deleteTask(index);\n      });\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskController);\n\n\n//# sourceURL=webpack:///./js/UI/TaskController.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_TaskController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/TaskController */ \"./js/UI/TaskController.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const uiController = new _UI_TaskController__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n    uiController.renderTaskList(); \n  \n});\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/models/Task.js":
/*!***************************!*\
  !*** ./js/models/Task.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task {\n    constructor(name, description, dueDate, priority, category, status) {\n      this.name = name;\n      this.description = description;\n      this.dueDate = dueDate;\n      this.priority = priority;\n      this.category = category;\n      this.status = status;\n    }\n  }\n  \n  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack:///./js/models/Task.js?");

/***/ }),

/***/ "./js/services/TaskLocalStorage.js":
/*!*****************************************!*\
  !*** ./js/services/TaskLocalStorage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass TaskLocalStorage {\n    static loadTasks() {\n      const tasksJSON = localStorage.getItem('tasks');\n      return tasksJSON ? JSON.parse(tasksJSON) : [];\n    }\n  \n    static saveTasks(tasks) {\n      localStorage.setItem('tasks', JSON.stringify(tasks));\n    }\n  }\n  \n  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskLocalStorage);\n\n//# sourceURL=webpack:///./js/services/TaskLocalStorage.js?");

/***/ }),

/***/ "./js/services/TaskManager.js":
/*!************************************!*\
  !*** ./js/services/TaskManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Task */ \"./js/models/Task.js\");\n/* harmony import */ var _TaskLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskLocalStorage */ \"./js/services/TaskLocalStorage.js\");\n\n\n\n\nclass TaskManager {\n  constructor() {\n    this.tasks = _TaskLocalStorage__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadTasks();\n  }\n\n  addTask(task) {\n    this.tasks.push(task);\n    this.saveTasks();\n  }\n\n  editTask(index, updatedTask) {\n    this.tasks[index] = updatedTask;\n    this.saveTasks();\n  }\n\n  deleteTask(index) {\n    this.tasks.splice(index, 1);\n    this.saveTasks();\n  }\n\n  filterTasksByStatus(status) {\n    return status === \"all\" ? this.tasks : this.tasks.filter(task => task.status === status);\n  }\n\n  getTasks() {\n    const savedTasks = localStorage.getItem('tasks');\n    if (savedTasks) {\n      return JSON.parse(savedTasks);\n    } else {\n      return [];\n    }\n  }\n\n  saveTasks() {\n    _TaskLocalStorage__WEBPACK_IMPORTED_MODULE_1__[\"default\"].saveTasks(this.tasks);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskManager);\n\n//# sourceURL=webpack:///./js/services/TaskManager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;