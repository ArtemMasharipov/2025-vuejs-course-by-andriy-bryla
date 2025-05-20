import toast from '@/services/enhancedToast'

export function syncToast(toastFn, message, options = {}) {
    
    setTimeout(() => {
        if (Array.isArray(message)) {
            
            toastFn(...message)
        } else {
            toastFn(message, options)
        }
    }, 100)
}

export function syncSuccess(message, options = {}) {
    syncToast(toast.success, message, options)
}

export function syncError(message, options = {}) {
    syncToast(toast.error, message, options)
}

export function syncInfo(message, options = {}) {
    syncToast(toast.info, message, options)
}

export default {
    syncToast,
    syncSuccess,
    syncError,
    syncInfo,
}
