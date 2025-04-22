import * as yup from 'yup';

export const createProductSchema = (t) => {
  return yup.object({
    title: yup
      .string()
      .required(t('validation.required'))
      .min(3, t('validation.minLength', { min: 3 })),
    description: yup
      .string()
      .required(t('validation.required')),
    price: yup
      .number()
      .required(t('validation.required'))
      .typeError(t('validation.number'))
      .min(0, t('validation.min', { min: 0 })),
    imageUrl: yup
      .string()
      .url(t('validation.url'))
      .nullable()
  });
};

export const getEmptyProductForm = () => ({
  title: '',
  description: '',
  price: 0,
  imageUrl: ''
});

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