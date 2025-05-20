
export const useStoreProperties = (storeFn, props = [], prefix = '') => {
    const computed = {}

    
    const storeKey = prefix ? `${prefix}Store` : 'store'
    computed[storeKey] = function () {
        return storeFn()
    }

    
    if (Array.isArray(props)) {
        
        props.forEach((prop) => {
            computed[prop] = function () {
                return this[storeKey][prop]
            }
        })
    } else {
        
        Object.entries(props).forEach(([localName, storeProp]) => {
            computed[localName] = function () {
                return this[storeKey][storeProp]
            }
        })
    }

    return computed
}

export const useStoreMethods = (storeFn, methods = []) => {
    const result = {}
    const storeKey = 'store'

    
    result[storeKey] = function () {
        return storeFn()
    }

    
    if (Array.isArray(methods)) {
        
        methods.forEach((method) => {
            result[method] = function (...args) {
                return this[storeKey][method](...args)
            }
        })
    } else {
        
        Object.entries(methods).forEach(([localName, storeMethod]) => {
            result[localName] = function (...args) {
                return this[storeKey][storeMethod](...args)
            }
        })
    }

    return result
}
