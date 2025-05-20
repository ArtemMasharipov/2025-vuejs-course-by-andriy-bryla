import { authApi } from '@/services/api/authService'
import { useCartStore } from '@/store/modules/cart/cart'
import { handleAsyncAction } from '@/store/modules/utils/stateHelpers'
import { createBaseStore } from '@/store/modules/utils/storeFactory'
import { toast } from '@/store/modules/utils/toast'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = createBaseStore({
    id: 'auth',
    api: authApi,

    customState: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
        permissions: [],
    }),

    customGetters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user,
        authToken: (state) => state.token,
        authLoading: (state) => state.loading,
        authError: (state) => state.error,
        hasPermission: (state) => (permission) => state.permissions.includes(permission),
    },

    customActions: {
        async initialize() {
            const token = localStorage.getItem('token')
            if (token) {
                this.token = token
                this.restoreUserFromToken()
            }
        },
        
        async login(credentials) {
            this.loading = true
            this.error = null

            try {
                const response = await authApi.login(credentials)

                
                if (!response || !response.user || !response.token) {
                    throw new Error('Invalid login response from server')
                }

                const { user, token } = response
                this.user = user
                this.token = token
                this.permissions = user.permissions || []

                
                localStorage.setItem('token', token)
                localStorage.setItem('userData', JSON.stringify(user))

                
                const cartStore = useCartStore()
                await cartStore.syncCart()

                
                toast.success(`Welcome back, ${user.name || user.email || 'User'}!`, {
                    duration: 4000,
                })

                return response
            } catch (error) {
                this.error = error.message || 'Login failed'
                this.user = null
                this.token = null
                this.permissions = []
                localStorage.removeItem('token')
                localStorage.removeItem('userData')

                
                toast.error(`Login failed: ${error.message || 'Invalid credentials'}`, {
                    duration: 5000,
                })

                throw error
            } finally {
                this.loading = false
            }
        },
        
        async register(userData) {
            return handleAsyncAction(
                this,
                async () => {
                    const { user, token } = await authApi.register(userData)
                    this.user = user
                    this.token = token
                    this.permissions = user.permissions || []
                    localStorage.setItem('token', token)
                    localStorage.setItem('userData', JSON.stringify(user))

                    
                    toast.success(`Welcome to Bookstore, ${user.name || user.email || 'User'}!`, {
                        duration: 5000,
                    })

                    return { user, token }
                },
                {
                    onError: (error) => {
                        toast.error(`Registration failed: ${error.message || 'Please try again'}`, {
                            duration: 5000,
                        })
                    },
                }
            )
        },
        
        async logout() {
            const userName = this.user?.name || this.user?.email || 'User'

            return handleAsyncAction(
                this,
                async () => {
                    await authApi.logout()
                    this.user = null
                    this.token = null
                    this.permissions = []
                    localStorage.removeItem('token')
                    localStorage.removeItem('userData')

                    
                    toast.info(`${userName} has been logged out`, {
                        duration: 3000,
                    })
                },
                {
                    onError: (error) => {
                        toast.error(`Logout failed: ${error.message}`, {
                            duration: 5000,
                        })
                    },
                }
            )
        },

        
        restoreUserFromToken() {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    
                    const decoded = jwtDecode(token)
                    this.token = token

                    
                    const userData = localStorage.getItem('userData')
                    if (userData) {
                        try {
                            
                            this.user = JSON.parse(userData)
                            this.permissions = this.user.permissions || []
                        } catch (parseError) {
                            
                            this.user = decoded
                            this.permissions = decoded.permissions || []
                        }
                    } else {
                        
                        this.user = decoded
                        this.permissions = decoded.permissions || []

                        
                        this.fetchCurrentUser()
                    }
                } catch (error) {
                    this.user = null
                    this.permissions = []
                    localStorage.removeItem('token')
                    localStorage.removeItem('userData')
                }
            }
        },

        
        async fetchCurrentUser() {
            try {
                
                const userData = await authApi.getCurrentUser()
                if (userData) {
                    this.user = userData
                    this.permissions = userData.permissions || []
                    
                }
            } catch (error) {
                
            }
        },

        
        async checkAuthStatus() {
            const token = localStorage.getItem('token')
            if (!token) return false

            try {
                
                const decoded = jwtDecode(token)

                
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    this.handleExpiredToken()
                    return false
                }

                return true
            } catch (error) {
                this.handleExpiredToken()
                return false
            }
        },

        
        handleExpiredToken() {
            this.user = null
            this.token = null
            this.permissions = []
            localStorage.removeItem('token')
            localStorage.removeItem('userData')
        },
    },
})
