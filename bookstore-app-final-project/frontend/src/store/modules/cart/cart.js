import { cartApi } from '@/services/api/cartApi'
import { syncError, syncInfo, syncSuccess } from '@/utils/toastSync'
import { useAuthStore } from '@/store/modules/auth/auth'
import { handleAsyncAction } from '@/store/modules/utils/stateHelpers'
import { createBaseStore } from '@/store/modules/utils/storeFactory'

export const useCartStore = createBaseStore({
    id: 'cart',
    api: cartApi,

    
    customState: () => ({
        items: JSON.parse(localStorage.getItem('cart')) || [],
        
    }),

    
    customGetters: {
        cartItems: (state) =>
            state.items.map(({ _id, bookId, quantity, price }) => ({
                _id,
                bookId: {
                    _id: bookId?._id || bookId,
                    title: bookId?.title || 'Unknown Book',
                    image: bookId?.image,
                },
                quantity: Number(quantity),
                price: Number(price),
            })),
        cartLoading: (state) => state.loading,
        cartError: (state) => state.error,
        cartTotal: (state) => {
            return state.items.reduce((total, item) => {
                return total + item.price * item.quantity
            }, 0)
        },
        itemCount: (state) => state.items.length,
        
        totalQuantity: (state) => {
            return state.items.reduce((total, item) => total + (Number(item.quantity) || 1), 0)
        },
    },

    
    customActions: {
        
        async fetchCart() {
            return handleAsyncAction(this, async () => {
                const { items = [] } = (await cartApi.fetchCart()) || {}
                this.setItems(items)
            })
        },
        
        async addToCart({ bookId, quantity, price, title = 'Book' }) {
            return handleAsyncAction(this, async () => {
                try {
                    const authStore = useAuthStore()
                    if (authStore.isAuthenticated) {
                        
                        const { items } = await cartApi.addToCart({ bookId, quantity, price })
                        this.setItems(items)
                    } else {
                        
                        this.addLocalItem({ bookId, quantity, price })
                    }

                    
                    syncSuccess(`"${title}" added to cart`, {
                        icon: 'shopping_cart',
                    })
                } catch (error) {
                    syncError(`Failed to add "${title}" to cart: ${error.message}`)
                    throw error
                }
            })
        },
        
        async removeFromCart(itemId, title = 'Item') {
            return handleAsyncAction(this, async () => {
                try {
                    const response = await cartApi.removeFromCart(itemId)
                    this.setItems(response.items)

                    
                    syncInfo(`"${title}" removed from cart`)
                } catch (error) {
                    syncError(`Failed to remove "${title}" from cart: ${error.message}`)
                    throw error
                }
            })
        },
        
        async updateQuantity(payload) {
            const { title = 'Item' } = payload

            return handleAsyncAction(this, async () => {
                try {
                    const authStore = useAuthStore()
                    if (authStore.isAuthenticated) {
                        
                        const response = await cartApi.updateQuantity(payload.itemId, payload.quantity)
                        if (response && response.items) {
                            this.setItems(response.items)
                        }
                    } else {
                        
                        this.updateLocalQuantity(payload)
                    }

                    
                    syncInfo(`"${title}" quantity updated to ${payload.quantity}`)
                } catch (error) {
                    syncError(`Failed to update quantity: ${error.message}`)
                    throw error
                }
            })
        },
        
        async clearCart() {
            return handleAsyncAction(this, async () => {
                try {
                    await cartApi.clearCart()
                    this.items = []
                    localStorage.removeItem('cart')

                    
                    syncInfo('Cart cleared successfully')
                } catch (error) {
                    syncError(`Failed to clear cart: ${error.message}`)
                    throw error
                }
            })
        },

        
        async syncCart() {
            return handleAsyncAction(this, async () => {
                const localCart = JSON.parse(localStorage.getItem('cart')) || []
                const response = await cartApi.syncCart(localCart)

                if (response?.items) {
                    this.setItems(response.items)
                    localStorage.removeItem('cart')
                } else {
                    throw new Error('Failed to sync cart')
                }
            })
        },

        
        setItems(items) {
            this.items = items || []
            localStorage.setItem('cart', JSON.stringify(this.items))
        },

        
        addLocalItem(item) {
            const existingItem = this.items.find((i) => i.bookId?._id === item.bookId?._id || i.bookId === item.bookId)
            if (existingItem) {
                existingItem.quantity += item.quantity
            } else {
                this.items.push(item)
            }
            localStorage.setItem('cart', JSON.stringify(this.items))
        },

        
        updateLocalQuantity({ bookId, quantity }) {
            const item = this.items.find((i) => i.bookId === bookId)
            if (item) {
                item.quantity = quantity
            }
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
    },
})
