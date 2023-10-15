class LocalStorageService {
  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      throw new Error(`Error loading data from localStorage: ${error.message}`);
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error(`Error saving data to localStorage: ${error.message}`);
    }
  }
}

export default LocalStorageService;