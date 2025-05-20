const UI = {
    SET_LOADING: 'setLoading',
    SET_ERROR: 'setError',
}

export const formatCurrency = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount || 0)
}

export const handleAsyncAction = async (store, action, options = {}) => {
    const {
        onSuccess,
        onError,
        loadingMutation = UI.SET_LOADING,
        errorMutation = UI.SET_ERROR,
        skipLoading = false,
    } = options

    
    !skipLoading && store[loadingMutation](true)

    try {
        const result = await action()
        onSuccess?.(result)
        return result
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message
        store[errorMutation](errorMessage)
        onError?.(error)
        throw error
    } finally {
        !skipLoading && store[loadingMutation](false)
    }
}
