import { productsDb } from './firebase/firestore';
import rbacService from './firebase/rbac';
import { permissionService } from './permissionService';

const executeServiceAction = async ({ actionFunction, errorHandler }) => {
  try {
    return await actionFunction();
  } catch (error) {
    console.error('Service operation failed:', error);
    
    if (errorHandler && typeof errorHandler === 'function') {
      return errorHandler(error);
    }
    
    throw error;
  }
};

export const canAddProducts = async () => {
  return await rbacService.hasPermission('create:products');
};

export const checkProductsAccess = async () => {
  return permissionService.isAdmin() || await rbacService.hasPermission('access:admin');
};

export const getEmptyProduct = () => ({
  title: '',
  description: '',
  price: 0,
  imageUrl: '',
  createdAt: new Date()
});

export const cleanProductData = (productData) => {
  if (!productData || typeof productData !== 'object') return null;

  const cleanedData = { ...productData };
  const serviceFields = [
    'isTrusted', '_vts', 'then', 'catch', 'finally', 'target', 
    'currentTarget', 'srcElement', 'defaultPrevented', 'cancelBubble'
  ];

  serviceFields.forEach(prop => {
    prop in cleanedData && delete cleanedData[prop];
  });

  return cleanedData;
};

export const prepareProductData = (productData) => {
  const cleanedData = cleanProductData(productData);
  if (!cleanedData) return null;

  cleanedData.price !== undefined && (cleanedData.price = Number(cleanedData.price));
  return cleanedData;
};

export const createProduct = async (productData) => {
  return executeServiceAction({
    actionFunction: async () => {
      if (!productData || !productData.title) {
        throw new Error('Cannot create product with empty data');
      }

      if (!(await rbacService.hasPermission('create:products'))) {
        throw new Error('You do not have permission to create products');
      }

      const cleanedData = prepareProductData(productData);
      return await productsDb.create(cleanedData);
    },
    errorHandler: (error) => {
      console.error('Error in createProduct:', error);
      throw error;
    }
  });
};

export const updateProduct = async (productId, productData) => {
  return executeServiceAction({
    actionFunction: async () => {
      if (!(await rbacService.hasPermission('update:products'))) {
        throw new Error('You do not have permission to update products');
      }

      const existingProduct = await productsDb.getById(productId);
      if (!existingProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      const cleanedData = prepareProductData(productData);
      if (!cleanedData) {
        throw new Error('Invalid data for product update');
      }

      const preparedData = {
        title: productData.title !== undefined ? productData.title : existingProduct.title,
        description: productData.description !== undefined ? productData.description : existingProduct.description,
        price: productData.price !== undefined ? productData.price : existingProduct.price,
        imageUrl: productData.imageUrl !== undefined ? productData.imageUrl : existingProduct.imageUrl,
        createdAt: existingProduct.createdAt
      };

      const updatedProduct = await productsDb.update(productId, preparedData);
      
      return {
        id: productId,
        ...updatedProduct
      };
    },
    errorHandler: (error) => {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  });
};

export const deleteProduct = async (productId) => {
  return executeServiceAction({
    actionFunction: async () => {
      if (!(await rbacService.hasPermission('delete:products'))) {
        throw new Error('You do not have permission to delete products');
      }

      await productsDb.delete(productId);
      return true;
    },
    errorHandler: (error) => {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  });
};