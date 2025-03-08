const modules = import.meta.glob('@/data/*.json', { eager: true });

export async function fetchData(filename) {
  try {
    const modulePath = `/src/data/${filename}`;
    const data = modules[modulePath]?.default;
    
    if (!data) {
      throw new Error(`File ${filename} not found`);
    }
    return data;
  } catch (error) {
    console.error(`Error loading file ${filename}:`, error);
    throw error;
  }
}

export function getProductsEndpoint(categoryId) {
  return `products_${categoryId}.json`;
}
