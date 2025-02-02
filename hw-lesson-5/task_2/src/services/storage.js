import { CART_STORAGE_KEY } from '@/constants'

export const storage = {
    getCart() {
        const cart = localStorage.getItem(CART_STORAGE_KEY)
        return cart ? JSON.parse(cart) : []
    },
    
    saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    },
    
    clearCart() {
        localStorage.removeItem(CART_STORAGE_KEY)
    }
}
