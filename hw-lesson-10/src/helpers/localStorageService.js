const DELAY = 800;

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, DELAY);
  });
};

const localStorageService = {
  async getItem(key) {
    try {
      await delay();
      
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },
  
  async setItem(key, value) {
    try {
      await delay();
      
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },
  
  async removeItem(key) {
    try {
      await delay();
      
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
};

export default localStorageService;
