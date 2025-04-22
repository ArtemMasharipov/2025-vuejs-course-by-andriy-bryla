export default class StorageService {
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch {
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  static has(key) {
    return localStorage.getItem(key) !== null;
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
}