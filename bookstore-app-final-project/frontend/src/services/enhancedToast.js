import { useToast } from 'vue-toast-notification'


const BASE_CONFIG = {
    position: 'top-right',
    dismissible: true,
    pauseOnHover: true,
    queue: false,
}

const TYPE_CONFIG = {
    success: { duration: 4000 },
    error: { duration: 8000 },
    warning: { duration: 6000 },
    info: { duration: 3000 },
    default: { duration: 5000 },
}

const MESSAGES = {
    crud: {
        createSuccess: (entity) => `${entity} успешно создан`,
        createError: (entity) => `Не удалось создать ${entity}`,
        updateSuccess: (entity) => `${entity} успешно обновлен`,
        updateError: (entity) => `Не удалось обновить ${entity}`,
        deleteSuccess: (entity) => `${entity} успешно удален`,
        deleteError: (entity) => `Не удалось удалить ${entity}`,
        loadError: (entity) => `Ошибка при загрузке ${entity}`,
    },
    auth: {
        loginSuccess: (name) => `Добро пожаловать, ${name}!`,
        loginError: () => `Ошибка входа`,
        logoutSuccess: (name) => `${name} успешно вышел из системы`,
        logoutError: () => `Ошибка выхода из системы`,
        registerSuccess: (name) => `Добро пожаловать, ${name}! Регистрация прошла успешно.`,
        registerError: () => `Ошибка регистрации`,
    },
    cart: {
        addSuccess: (item) => `"${item}" добавлен в корзину`,
        addError: (item) => `Ошибка добавления "${item}" в корзину`,
        removeSuccess: (item) => `"${item}" удален из корзины`,
        removeError: (item) => `Ошибка удаления "${item}" из корзины`,
        updateSuccess: (item, qty) => `Количество "${item}" изменено на ${qty}`,
        updateError: () => `Ошибка обновления количества`,
        clearSuccess: () => `Корзина очищена`,
        clearError: () => `Ошибка очистки корзины`,
    },
    order: {
        createSuccess: (id) => `Заказ #${id} успешно создан!`,
        updateSuccess: (id, status) => `Статус заказа #${id} изменен на "${status}"`,
        cancelSuccess: (id) => `Заказ #${id} отменен`,
    },
}

export function showSuccess(message, options = {}) {
    return useToast().success(message, {
        ...BASE_CONFIG,
        ...TYPE_CONFIG.success,
        ...options,
    })
}

export function showError(message, options = {}) {
    return useToast().error(message, {
        ...BASE_CONFIG,
        ...TYPE_CONFIG.error,
        ...options,
    })
}

export function showWarning(message, options = {}) {
    return useToast().warning(message, {
        ...BASE_CONFIG,
        ...TYPE_CONFIG.warning,
        ...options,
    })
}

export function showInfo(message, options = {}) {
    return useToast().info(message, {
        ...BASE_CONFIG,
        ...TYPE_CONFIG.info,
        ...options,
    })
}

export function clearAll() {
    useToast().clear()
}

export function withToast(fn, messages, options = {}) {
    return async (...args) => {
        try {
            const result = await fn(...args)
            if (messages?.success) showSuccess(typeof messages.success === 'function' ? messages.success(...args, result) : messages.success, options)
            return result
        } catch (error) {
            if (messages?.error) showError(typeof messages.error === 'function' ? messages.error(...args, error) : messages.error, options)
            throw error
        }
    }
}

export function createWithToast(createFn, messages, options = {}) {
    return withToast(createFn, messages, options)
}

export function updateWithToast(updateFn, messages, options = {}) {
    return withToast(updateFn, messages, options)
}

export function deleteWithToast(deleteFn, messages, options = {}) {
    return withToast(deleteFn, messages, options)
}

export const toast = {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    clear: clearAll,
    withToast,
    createWithToast,
    updateWithToast,
    deleteWithToast,
    messages: MESSAGES,
    baseConfig: BASE_CONFIG,
    typeConfig: TYPE_CONFIG,
}

export default toast
