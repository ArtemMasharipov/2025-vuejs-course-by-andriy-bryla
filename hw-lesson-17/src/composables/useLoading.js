import { ref } from 'vue';

export function useLoading() {
  const isLoading = ref(false);
  
  function startLoading() {
    isLoading.value = true;
  }
  
  function stopLoading() {
    isLoading.value = false;
  }
  
  async function withLoading(callback) {
    try {
      startLoading();
      return await callback();
    } finally {
      stopLoading();
    }
  }
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  };
}