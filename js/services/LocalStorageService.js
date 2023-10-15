class TaskLocalStorage {
  
    static loadTasks() {
      const tasksJSON = localStorage.getItem('tasks');
      return tasksJSON ? JSON.parse(tasksJSON) : [];
    }
  
    static saveTasks(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  
  export default TaskLocalStorage;