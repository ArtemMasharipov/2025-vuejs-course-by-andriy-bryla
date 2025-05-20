import { defineStore } from 'pinia'
import { toast } from '@/store/modules/utils/toast'
import { useOrdersStore } from '@/store/modules/orders/orders'

export const useOrdersUiStore = defineStore('ordersUi', {
    state: () => ({
        statusFilter: null,
        sortBy: 'newest',
        currentPage: 1,
        itemsPerPage: 5,
        statusOptions: [
            { title: 'All Orders', value: null },
            { title: 'Pending', value: 'pending' },
            { title: 'Processing', value: 'processing' },
            { title: 'Shipped', value: 'shipped' },
            { title: 'Delivered', value: 'delivered' },
            { title: 'Cancelled', value: 'cancelled' },
        ],
        sortOptions: [
            { title: 'Newest First', value: 'newest' },
            { title: 'Oldest First', value: 'oldest' },
            { title: 'Highest Total', value: 'total-desc' },
            { title: 'Lowest Total', value: 'total-asc' },
        ],
    }),
    getters: {
        
        getStatusFilter: (state) => state.statusFilter,

        
        getSortBy: (state) => state.sortBy,

        
        getCurrentPage: (state) => state.currentPage,

        
        getItemsPerPage: (state) => state.itemsPerPage,

        
        getStatusOptions: (state) => state.statusOptions,

        
        getSortOptions: (state) => state.sortOptions,

        
        filteredOrders(state) {
            const ordersStore = useOrdersStore()
            
            let result = []

            
            if (ordersStore && ordersStore.ordersList) {
                if (Array.isArray(ordersStore.ordersList)) {
                    result = [...ordersStore.ordersList]
                } else {
                    console.warn('ordersList is not an array:', ordersStore.ordersList)
                }
            }

            
            if (state.statusFilter && result.length > 0) {
                result = result.filter((order) => order.status === state.statusFilter)
            }

            
            switch (state.sortBy) {
                case 'newest':
                    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    break
                case 'oldest':
                    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    break
                case 'total-desc':
                    result.sort((a, b) => parseFloat(b.total) - parseFloat(a.total))
                    break
                case 'total-asc':
                    result.sort((a, b) => parseFloat(a.total) - parseFloat(b.total))
                    break
            }

            return result
        },

        
        displayedOrders(state) {
            
            const filtered = Array.isArray(this.filteredOrders) ? this.filteredOrders : []
            const start = Math.min((state.currentPage - 1) * state.itemsPerPage, filtered.length)
            const end = Math.min(start + state.itemsPerPage, filtered.length)
            return filtered.slice(start, end)
        },

        
        pageCount(state) {
            
            const filtered = Array.isArray(this.filteredOrders) ? this.filteredOrders : []
            const length = filtered.length
            return Math.max(1, Math.ceil(length / state.itemsPerPage))
        },

        
        getStatusFilter: (state) => state.statusFilter,
        getSortBy: (state) => state.sortBy,
        getCurrentPage: (state) => state.currentPage,
        getItemsPerPage: (state) => state.itemsPerPage,
        getStatusOptions: (state) => state.statusOptions,
        getSortOptions: (state) => state.sortOptions,
    },

    actions: {
        
        async fetchOrders() {
            const ordersStore = useOrdersStore()
            try {
                return await ordersStore.fetchOrders()
            } catch (error) {
                
                if (error.status !== 401) {
                    
                    if (error.status === 404) {
                        console.warn('Orders API endpoint not found. Using empty array as fallback.')
                        
                        ordersStore.orders = []
                        ordersStore.items = []

                        
                        if (!error.isExpected) {
                            toast.info('Orders service is currently unavailable.', {
                                duration: 3000,
                                position: 'top-center',
                            })
                        }
                    } else {
                        toast.error(error.message || 'Failed to load orders')
                    }
                }
            }
        },

        
        clearError() {
            const ordersStore = useOrdersStore()
            ordersStore.clearError()
        },

        
        applyFilter(status) {
            this.statusFilter = status
            this.currentPage = 1 
        },

        
        applySort(sortOption) {
            this.sortBy = sortOption
            this.currentPage = 1 
        },

        
        getStatusColor(status) {
            if (!status) return 'grey'

            const statusColors = {
                pending: 'orange',
                processing: 'blue',
                shipped: 'cyan',
                delivered: 'success',
                cancelled: 'error',
            }

            return statusColors[status] || 'grey'
        },

        
        getStatusIcon(status) {
            if (!status) return 'mdi-help-circle'

            const statusIcons = {
                pending: 'mdi-clock-outline',
                processing: 'mdi-cog-outline',
                shipped: 'mdi-truck-delivery-outline',
                delivered: 'mdi-check-circle-outline',
                cancelled: 'mdi-close-circle-outline',
            }

            return statusIcons[status] || 'mdi-help-circle'
        },

        
        formatDate(date) {
            if (!date) return 'Unknown date'
            try {
                return new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })
            } catch (err) {
                console.warn('Date formatting error:', err)
                return String(date)
            }
        },

        
        formatPrice(price) {
            if (price === undefined || price === null) return '0.00'

            try {
                return Number(price).toFixed(2)
            } catch (err) {
                console.warn('Price formatting error:', err)
                return '0.00'
            }
        },

        
        applySort(sort) {
            this.sortBy = sort
            this.currentPage = 1 
        },

        
        getStatusColor(status) {
            const statusColors = {
                pending: 'warning',
                processing: 'info',
                shipped: 'success',
                delivered: 'primary',
                cancelled: 'error',
            }
            return statusColors[status] || 'grey'
        },

        
        getStatusIcon(status) {
            const statusIcons = {
                pending: 'mdi-clock-outline',
                processing: 'mdi-progress-check',
                shipped: 'mdi-truck-delivery-outline',
                delivered: 'mdi-check-circle-outline',
                cancelled: 'mdi-cancel',
            }
            return statusIcons[status] || 'mdi-help-circle-outline'
        },

        
        formatDate(dateString) {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }
            return new Date(dateString).toLocaleDateString(undefined, options)
        },

        
        formatPrice(price) {
            return parseFloat(price).toFixed(2)
        },
    },
})
