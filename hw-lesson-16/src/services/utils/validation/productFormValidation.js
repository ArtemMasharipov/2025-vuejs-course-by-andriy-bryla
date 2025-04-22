export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateProductForm = (form, translateFn) => {
  const errors = {
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  };
  
  let isValid = true;
  
  if (!form.title.trim()) {
    errors.title = translateFn('validation.required');
    isValid = false;
  } else if (form.title.length < 3) {
    errors.title = translateFn('validation.minLength', { min: 3 });
    isValid = false;
  }
  
  if (!form.description.trim()) {
    errors.description = translateFn('validation.required');
    isValid = false;
  }
  
  if (typeof form.price !== 'number' || isNaN(form.price)) {
    errors.price = translateFn('validation.number');
    isValid = false;
  } else if (form.price < 0) {
    errors.price = translateFn('validation.min', { min: 0 });
    isValid = false;
  }
  
  if (form.imageUrl && !validateUrl(form.imageUrl)) {
    errors.imageUrl = translateFn('validation.url');
    isValid = false;
  }
  
  return { errors, isValid };
};

export const getEmptyProductForm = () => {
  return {
    title: '',
    description: '',
    price: 0,
    imageUrl: ''
  };
};

export const getEmptyProductErrors = () => {
  return {
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  };
};

export const prepareProductData = (form, productId = null) => {
  const productData = {
    ...(productId ? { id: productId } : {}),
    title: form.title.trim(),
    description: form.description.trim(),
    price: parseFloat(form.price) || 0,
    imageUrl: form.imageUrl?.trim() || ''
  };
  
  return productData;
};