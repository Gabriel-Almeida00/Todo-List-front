class Task {
    constructor(name, description, dueDate, priority, category, status, emailNotification) {
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.category = category;
      this.status = status;
      this.emailNotification = emailNotification;
    }
  }
  export default Task;