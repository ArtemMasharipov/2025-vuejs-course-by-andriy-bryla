const handleStorageError = (operation, key, error) => {
  console.error(`Storage error ${operation} ${key ? `key "${key}"` : ''}:`, error);
  return false;
};

const storage = {
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      if (value === null || value === "undefined" || value === undefined) {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (error) {
      handleStorageError('reading', key, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return handleStorageError('saving', key, error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return handleStorageError('removing', key, error);
    }
  },
  
  has(key) {
    return localStorage.getItem(key) !== null;
  },
  
  getMany(keys, defaultValue = null) {
    return keys.reduce((results, key) => {
      results[key] = this.get(key, defaultValue);
      return results;
    }, {});
  },
  
  setMany(entries) {
    let success = true;
    Object.entries(entries).forEach(([key, value]) => {
      success = this.set(key, value) && success;
    });
    return success;
  },
  
  clear(prefix = '') {
    try {
      if (!prefix) {
        localStorage.clear();
        return true;
      }
      
      Object.keys(localStorage)
        .filter(key => key.startsWith(prefix))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      return handleStorageError('clearing', prefix, error);
    }
  }
};

export default storage;
