import { useAuthStore } from '@/store'

const authGuard = async (to, from, next) => {
    const authStore = useAuthStore()
    let isAuthenticated = authStore.isAuthenticated
    const requiredPermission = to.meta.requiredPermission

    
    if (to.meta.requiresAuth && isAuthenticated) {
        
        const isValid = await authStore.checkAuthStatus()
        if (!isValid) {
            isAuthenticated = false
        }
    }

    if (to.meta.requiresAuth && !isAuthenticated) {
        
        if (to.path !== '/login' && to.path !== '/register') {
            localStorage.setItem('redirectPath', to.fullPath)
        }
        next('/login')
        return
    }

    
    if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
        next('/unauthorized')
        return
    }

    next()
}

export default authGuard
