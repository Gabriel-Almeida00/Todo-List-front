class TaskValidation {
    validateTask(task) {
        return (
            this.validatePriority(task.priority) &&
            this.validateDueDate(task.dueDate) &&
            this.validateRequiredFields(task)
        );
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

    validateRequiredFields(task) {
        return (
            task.name !== "" &&
            task.description !== "" &&
            task.dueDate !== "" &&
            !isNaN(task.priority) &&
            task.category !== ""
        );
    }
}
export default TaskValidation;