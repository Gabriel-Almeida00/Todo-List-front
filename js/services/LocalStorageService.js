import DataService from "./DataService"

class LocalStorageService extends DataService{
  constructor(key) {
    super();
    this.key = key;
}

save(dados) {
    const dadosJSON = JSON.stringify(dados);
    localStorage.setItem(this.key, dadosJSON);
}

load() {
    const dadosJSON = localStorage.getItem(this.key);
    if (dadosJSON) {
        return JSON.parse(dadosJSON);
    }
    return [];
}
}

export default LocalStorageService;