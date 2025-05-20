import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useAuthUiStore = defineStore('authUi', {
    state: () => ({
        
        redirectPath: '/',
        showSessionExpiredModal: false,
        rememberMe: false,
    }),

    getters: {
        getRedirectPath: (state) => state.redirectPath,
        getShowSessionExpiredModal: (state) => state.showSessionExpiredModal,
        getRememberMe: (state) => state.rememberMe,
    },

    actions: {
        
        async handleLogin(credentials) {
            const authStore = useAuthStore()

            
            authStore.$patch({ error: null })
            try {
                
                await authStore.login(credentials)
                return true
            } catch (error) {
                return false
            }
        },

        
        async handleRegister(userData) {
            const authStore = useAuthStore()

            
            authStore.$patch({ error: null })

            try {
                
                await authStore.register(userData)
                return true
            } catch (error) {
                return false
            }
        },

        
        setRedirectPath(path) {
            this.redirectPath = path
        },

        
        async handleLogout() {
            const authStore = useAuthStore()
            await authStore.logout()
        },

        
        showSessionExpired() {
            this.showSessionExpiredModal = true
        },

        
        hideSessionExpired() {
            this.showSessionExpiredModal = false
        },

        
        clearError() {
            const authStore = useAuthStore()
            authStore.$patch({ error: null })
        },

        
        setRememberMe(value) {
            this.rememberMe = value
        },
    },
})
