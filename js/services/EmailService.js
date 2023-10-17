import ConfigEmail from "../config/ConfigEmail";

class EmailService {
  constructor() {
    this.configEmail = new ConfigEmail();
  }

  async sendEmail(subject, body, to) {
    await this.configEmail.loadConfigFromFile(); 
    const smtpHost = this.configEmail.getSmtpHost();
    const username = this.configEmail.getUsername();
    const password = this.configEmail.getPassword();

    Email.defaults = {
      Host: smtpHost,
      Username: username,
      Password: password,
    };

    Email.send({
      Host: Email.defaults.Host,
      Username: Email.defaults.Username,
      Password: Email.defaults.Password,
      To: to,
      From: Email.defaults.Username,
      Subject: subject,
      Body: body,
    }).then(function (message) {
      console.log("E-mail enviado com sucesso: " + message);
    });
  }

  async sendEmailForDueDate(task) {
    if (task.emailNotification.checkDueDate && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const currentDate = new Date();
      const oneDay = 24 * 60 * 60 * 1000;

      if (dueDate - currentDate <= oneDay) {
        const subject = "Lembrete de Tarefa";
        const body = `Sua tarefa "${task.name}" tem uma data de término em um dia. Por favor, termine-a a tempo.`;

        await this.sendEmail(subject, body, task.emailNotification.email);
      }
    }
  }

  async sendEmailForTaskDone(task) {
    if (task.emailNotification.checkTaskDone && task.status === "done") {
      const subject = "Tarefa Concluída";
      const body = `Sua tarefa "${task.name}" foi concluída com sucesso.`;

      await this.sendEmail(subject, body, task.emailNotification.email);
    }
  }

  async sendEmailForTaskPending(task) {
    if (task.emailNotification.checkTaskPending && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const currentDate = new Date();

      if (currentDate > dueDate) {
        const subject = "Tarefa Pendente";
        const body = `Sua tarefa "${task.name}" está pendente. Ela deveria ter sido concluída até a data de término.`;

        await this.sendEmail(subject, body, task.emailNotification.email);
      }
    }
  }

  async sendEmailBasedOnTaskStatus(task) {
    await this.sendEmailForDueDate(task);
    await this.sendEmailForTaskDone(task);
    await this.sendEmailForTaskPending(task);
  }
  }
  
  export default EmailService;
