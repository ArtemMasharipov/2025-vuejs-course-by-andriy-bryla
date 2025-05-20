import { toast } from './enhancedToast'

export async function handleCreate({ entityName, displayName, operation, onSuccess, onError }) {
    try {
        const result = await operation()
        const displayValue = typeof displayName === 'function' ? displayName(result) : displayName

        toast.success(toast.messages.crud.createSuccess(`${entityName} "${displayValue}"`))

        if (onSuccess) {
            onSuccess(result)
        }

        return result
    } catch (error) {
        toast.error(toast.messages.crud.createError(entityName), error)

        if (onError) {
            onError(error)
        }

        throw error
    }
}

export async function handleUpdate({ entityName, displayName, operation, onSuccess, onError }) {
    try {
        const result = await operation()

        
        const displayValue = typeof displayName === 'function' ? displayName(result) : displayName

        toast.success(toast.messages.crud.updateSuccess(`${entityName} "${displayValue}"`))

        if (onSuccess) {
            onSuccess(result)
        }

        return result
    } catch (error) {
        toast.error(toast.messages.crud.updateError(entityName), error)

        if (onError) {
            onError(error)
        }

        throw error
    }
}

export async function handleDelete({ entityName, displayName, operation, onSuccess, onError }) {
    try {
        const result = await operation()

        
        const displayValue = typeof displayName === 'function' ? displayName(result) : displayName

        toast.info(toast.messages.crud.deleteSuccess(`${entityName} "${displayValue}"`))

        if (onSuccess) {
            onSuccess(result)
        }

        return result
    } catch (error) {
        toast.error(toast.messages.crud.deleteError(entityName), error)

        if (onError) {
            onError(error)
        }

        throw error
    }
}

export async function handleLoad({
    entityName,
    operation,
    onSuccess,
    onError,
    silent = true,
}) {
    try {
        const result = await operation()

        if (!silent) {
            toast.success(`${entityName} успешно загружены`)
        }

        if (onSuccess) {
            onSuccess(result)
        }

        return result
    } catch (error) {
        toast.error(toast.messages.crud.loadError(entityName), error)

        if (onError) {
            onError(error)
        }

        throw error
    }
}

export async function handleOperation(operationType, options) {
    switch (operationType) {
        case 'create':
            return handleCreate(options)
        case 'update':
            return handleUpdate(options)
        case 'delete':
            return handleDelete(options)
        case 'load':
            return handleLoad(options)
        default:
            throw new Error(`Неизвестный тип операции: ${operationType}`)
    }
}

export default {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleLoad,
    handleOperation,
}
