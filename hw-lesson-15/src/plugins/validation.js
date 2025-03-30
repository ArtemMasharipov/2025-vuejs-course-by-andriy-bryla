import { configure } from 'vee-validate';
import { setLocale } from 'yup';

export function setupValidation() {
  setLocale({
    mixed: {
      required: 'This field is required',
      notType: 'Invalid input type'
    },
  });

  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: false,
  });
}
