import i18n from '@/config/i18n';
import { useToast } from 'vue-toastification';

const { t } = i18n.global;

export const toast = useToast();

export const showSuccess = (messageKey = 'default', params = {}) => {
  const message = messageKey.includes('.') 
    ? t(messageKey, params) 
    : t(`toast.success.${messageKey}`, params);
  toast.success(message);
};

export const showError = (messageKey = 'default', params = {}) => {
  const message = messageKey.includes('.') 
    ? t(messageKey, params) 
    : t(`toast.error.${messageKey}`, params);
  toast.error(message);
};

export const showInfo = (messageKey = 'default', params = {}) => {
  const message = messageKey.includes('.') 
    ? t(messageKey, params) 
    : t(`toast.info.${messageKey}`, params);
  toast.info(message);
};

export const showWarning = (messageKey = 'default', params = {}) => {
  const message = messageKey.includes('.') 
    ? t(messageKey, params) 
    : t(`toast.warning.${messageKey}`, params);
  toast.warning(message);
};

export const showToast = (messageKey = 'default', type = 'default', params = {}) => {
  const message = messageKey.includes('.') 
    ? t(messageKey, params) 
    : t(`toast.${type}.${messageKey}`, params);
    
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'info':
      return toast.info(message);
    case 'warning':
      return toast.warning(message);
    default:
      return toast(message);
  }
};