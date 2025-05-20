import { orderApi } from '@/services/api/orderApi'
import { toast } from '@/store/modules/utils/toast'
import { useCartStore } from '@/store/modules/cart/cart'
import { handleAsyncAction } from '@/store/modules/utils/stateHelpers'
import { createBaseStore } from '@/store/modules/utils/storeFactory'

export const useOrdersStore = createBaseStore({
    id: 'orders',
    api: orderApi,

    
    customState: () => ({
        
        orders: [], 
        _currentOrder: null, 
    }),

    
    customGetters: {
        
        ordersList: (state) => {
            
            if (Array.isArray(state.orders)) return state.orders
            if (Array.isArray(state.items)) return state.items
            return [] 
        },
        getOrder: (state) => state._currentOrder || state.current, 
        
    },

    
    customActions: {
        
        async createOrder(orderData) {
            return handleAsyncAction(this, async () => {
                
                const order = await orderApi.createOrder(orderData)

                
                if (!Array.isArray(this.orders)) {
                    this.orders = []
                }
                if (!Array.isArray(this.items)) {
                    this.items = []
                }

                
                this.orders.unshift(order)
                this.items.unshift(order) 

                
                const cartStore = useCartStore()
                await cartStore.clearCart()
                
                toast.success(`Order #${order._id || order.id || 'New'} placed successfully!`, {
                    duration: 6000,
                    position: 'top-center',
                })

                return order
            })
        },

        
        async fetchOrders() {
            return handleAsyncAction(this, async () => {
                try {
                    
                    const orders = await orderApi.getOrders()

                    
                    this.orders = Array.isArray(orders) ? orders : []
                    this.items = Array.isArray(orders) ? orders : [] 

                    return orders
                } catch (error) {
                    
                    this.orders = []
                    this.items = []
                    throw error
                }
            })
        },

        
        async fetchOrderById(id) {
            return handleAsyncAction(this, async () => {
                
                const order = await orderApi.getOrderById(id)

                
                this._currentOrder = order
                this.current = order 

                return order
            })
        },

        
        async updateOrderStatus({ id, status }) {
            return handleAsyncAction(this, async () => {
                
                const updatedOrder = await orderApi.updateOrderStatus(id, status)

                
                const orderInItems = this.items.find((o) => o._id === id)
                if (orderInItems) {
                    orderInItems.status = updatedOrder.status
                }

                const orderInOrders = this.orders.find((o) => o._id === id)
                if (orderInOrders) {
                    orderInOrders.status = updatedOrder.status
                }
                
                toast.success(`Order #${id} status updated to "${status}"`, {
                    duration: 4000,
                })

                return updatedOrder
            })
        },

        
        async cancelOrder(id) {
            return handleAsyncAction(this, async () => {
                
                const updatedOrder = await orderApi.cancelOrder(id)

                
                const orderInItems = this.items.find((o) => o._id === id)
                if (orderInItems) {
                    orderInItems.status = updatedOrder.status
                }

                const orderInOrders = this.orders.find((o) => o._id === id)
                if (orderInOrders) {
                    orderInOrders.status = updatedOrder.status
                }
                
                toast.warning(`Order #${id} has been cancelled`, {
                    duration: 4000,
                })

                return updatedOrder
            })
        },

        
        async initializeStore() {
            
            if (!Array.isArray(this.orders)) {
                this.orders = []
            }
            if (!Array.isArray(this.items)) {
                this.items = []
            }

            
            if (!this.initialized) {
                
                try {
                    await this.fetchOrders()
                } catch (error) {
                    
                    console.warn('Failed to initialize orders store:', error)
                }

                this.initialized = true
            }

            return true
        },
    },
})
