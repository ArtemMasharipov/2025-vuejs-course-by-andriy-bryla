import { defineStore } from 'pinia'
import { handleAsyncAction } from './stateHelpers'

export const createBaseStore = ({
    id,
    api = null,
    customState = () => ({}),
    customGetters = {},
    customActions = {},
}) => {
    return defineStore(id, {
        state: () => ({
            loading: false,
            error: null,
            items: [],
            current: null,
            initialized: false,
            meta: {},
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            },
            filters: {},
            
            ...customState(),
        }),

        
        getters: {
            
            isLoading: (state) => state.loading,
            hasError: (state) => !!state.error,
            isEmpty: (state) => state.items.length === 0,
            itemCount: (state) => state.items.length,
            isInitialized: (state) => state.initialized,

            
            paginatedItems: (state) => {
                if (!state.pagination || state.pagination.page <= 1) {
                    return state.items
                }

                const { page, limit } = state.pagination
                const startIndex = (page - 1) * limit
                return state.items.slice(startIndex, startIndex + limit)
            },

            
            ...customGetters,
        },

        actions: {
            setLoading(status) {
                this.loading = status
            },

            setError(error) {
                this.error = error
            },

            setItems(items) {
                this.items = Array.isArray(items) ? items : []
            },

            clearError() {
                this.error = null
            },

            resetState() {
                this.loading = false
                this.error = null
                this.items = []
                this.current = null
                this.initialized = false
                this.pagination = {
                    page: 1,
                    limit: 10,
                    total: 0,
                    pages: 0,
                }
                this.filters = {}
                this.meta = {}
            },

            
            async initializeStore() {
                if (this.initialized) return

                
                if (api && typeof api.fetchAll === 'function') {
                    await this.fetchAll()
                }

                this.initialized = true
                return true
            },

             async fetchAll(params = {}) {
                if (!api || typeof api.fetchAll !== 'function') {
                    return this.items
                }

                return handleAsyncAction(this, async () => {
                    const response = await api.fetchAll(params)

                    
                    if (Array.isArray(response)) {
                        this.items = response
                        this.pagination = {
                            page: 1,
                            limit: response.length,
                            total: response.length,
                            pages: 1,
                        }
                    } else if (response && typeof response === 'object') {
                        
                        this.items = response.items || response.data || response.results || []

                        
                        if (response.pagination) {
                            this.pagination = response.pagination
                        } else if (response.meta && response.meta.pagination) {
                            this.pagination = response.meta.pagination
                        }

                        
                        if (response.meta) {
                            this.meta = response.meta
                        }
                    }

                    return this.items
                })
            },

             async fetchById(id) {
                if (!api || typeof api.fetchById !== 'function') {
                    return null
                }

                return handleAsyncAction(this, async () => {
                    const item = await api.fetchById(id)
                    this.current = item
                    return item
                })
            },

             async create(payload) {
                if (!api || typeof api.create !== 'function') {
                    return null
                }

                return handleAsyncAction(this, async () => {
                    const item = await api.create(payload)
                    this.items.push(item)
                    this.current = item
                    return item
                })
            },

             async update(id, payload) {
                if (!api || typeof api.update !== 'function') {
                    return null
                }

                return handleAsyncAction(this, async () => {
                    const item = await api.update(id, payload)

                    
                    const index = this.items.findIndex((i) => i.id === id || i._id === id)
                    if (index !== -1) {
                        this.items.splice(index, 1, item)
                    }

                    this.current = item
                    return item
                })
            },

             async delete(id) {
                if (!api || typeof api.delete !== 'function') {
                    return false
                }

                return handleAsyncAction(this, async () => {
                    await api.delete(id)

                    
                    this.items = this.items.filter((item) => item.id !== id && item._id !== id)

                    
                    if (this.current && (this.current.id === id || this.current._id === id)) {
                        this.current = null
                    }

                    return true
                })
            },

            
            applyFilters(filters = {}) {
                this.filters = { ...this.filters, ...filters }
                return this.filters
            },

            
            clearFilters() {
                this.filters = {}
            },

            
            updatePagination(paginationData) {
                this.pagination = { ...this.pagination, ...paginationData }
            },

            
            ...customActions,
        },
    })
}
