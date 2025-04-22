import * as yup from 'yup';

export const createContactSchema = (t) => {
  return yup.object({
    name: yup
      .string()
      .required(t('validation.required')),
    email: yup
      .string()
      .required(t('validation.required'))
      .email(t('validation.email')),
    subject: yup
      .string()
      .required(t('validation.required')),
    message: yup
      .string()
      .required(t('validation.required'))
      .min(10, t('validation.minLength', { min: 10 }))
  });
};

export const getEmptyContactForm = () => ({
  name: '',
  email: '',
  subject: '',
  message: ''
});