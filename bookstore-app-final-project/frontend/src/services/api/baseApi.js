import axios from 'axios'

const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 15000, 
    validateStatus: (status) => status < 500,
}

const baseApi = axios.create(API_CONFIG)

const handleError = (error) => {
    
    if (error.message === 'Network Error' || !error.response || error.code === 'ECONNABORTED') {
        let errorMessage = 'Network connection error. Please check your connection and try again.'

        if (error.code === 'ECONNABORTED') {
            errorMessage = 'Request timed out. Please try again later.'
        }

        throw new Error(errorMessage)
    }

    const { status, data, config } = error.response
    const message = data?.message || data?.error || 'Unexpected error occurred'

    
    if (status === 404) {
        
        if (config?.url?.includes('/orders')) {
            console.warn('Orders API endpoint returned 404. Backend might not be ready yet.')
            const customError = new Error('Orders service is currently unavailable.')
            customError.status = status
            customError.isExpected = true 
            throw customError
        }
    }

    if (status === 401) {
        
        const currentPath = window.location.pathname
        if (currentPath !== '/login' && currentPath !== '/register') {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    }

    
    const errorObject = new Error(message)
    errorObject.status = status
    errorObject.data = data
    throw errorObject
}

baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const isPublic = ['/auth/login', '/auth/register'].some((ep) => config.url.endsWith(ep))

        if (!isPublic) {
            if (!token) {
                throw new Error('Authorization required')
            }
            config.headers.Authorization = `Bearer ${token}`
        }

        if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json'
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

baseApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return handleError(error)
    }
)

export const apiRequest = async (method, url, data = null, config = {}) => {
    try {
        const response = await baseApi({
            method,
            url,
            ...(data && { data }),
            ...config,
        });
        
        
        if (url.includes('/books')) {
            const books = Array.isArray(response.data) ? response.data :
                         response.data?.books || response.data?.data || [];
            
                    }

        return response.data;
    } catch (error) {
        throw error;
    }
}

export default baseApi
