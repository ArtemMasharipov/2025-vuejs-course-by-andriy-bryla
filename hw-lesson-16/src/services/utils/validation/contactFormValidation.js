export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateContactForm = (form, translateFn) => {
  const errors = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let isValid = true;
  
  if (!form.name.trim()) {
    errors.name = translateFn('validation.required');
    isValid = false;
  }
  
  if (!form.email.trim()) {
    errors.email = translateFn('validation.required');
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email = translateFn('validation.email');
    isValid = false;
  }
  
  if (!form.subject.trim()) {
    errors.subject = translateFn('validation.required');
    isValid = false;
  }
  
  if (!form.message.trim()) {
    errors.message = translateFn('validation.required');
    isValid = false;
  } else if (form.message.length < 10) {
    errors.message = translateFn('validation.minLength', { min: 10 });
    isValid = false;
  }
  
  return { errors, isValid };
};

export const getEmptyContactForm = () => {
  return {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};

export const getEmptyErrors = () => {
  return {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};