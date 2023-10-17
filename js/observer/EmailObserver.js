class EmailObserver{
    constructor(emailService) {
        this.emailService = emailService;
        this.observers = [];
    }
    
      addObserver(observer) {
        this.observers.push(observer);
      }
    
      removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          this.observers.splice(index, 1);
        }
      }
    
      sendEmailsBasedOnEvents(tasks) {
        tasks.forEach((task) => {
          this.emailService.sendEmailBasedOnTaskStatus(task);
        });
      }
}
export default EmailObserver;