class ConfigEmail{
  constructor() {
    this.loadConfigFromFile();
  }

  async loadConfigFromFile() {
    try {
      const response = await fetch('/email-config.json');
      const data = await response.json();
      this.smtpHost = data.smtpHost;
      this.username = data.username;
      this.password = data.password;
    } catch (error) {
      throw new Error(`Erro ao carregar o arquivo de configuração: ${error.message}`);
    }
  }

  getSmtpHost() {
    return this.smtpHost;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }
}
export default ConfigEmail;