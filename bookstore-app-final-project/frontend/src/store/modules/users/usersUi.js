import { defineStore } from 'pinia'
import { toast } from '@/store/modules/utils/toast'
import { useUsersStore } from '@/store/modules/users/users'

export const useUsersUiStore = defineStore('usersUi', {
    state: () => ({
        showConfirmDialog: false,
        userToDelete: null,
    }),
    getters: {
        getShowConfirmDialog: (state) => state.showConfirmDialog,
        getUserToDelete: (state) => state.userToDelete,
    },

    actions: {
        
        init() {
            if (this.isAdmin) {
                this.fetchUsers()
            }
        },
         async fetchUsers() {
            const usersStore = useUsersStore()
            try {
                return await usersStore.fetchUsers()
            } catch (error) {
                
                if (error.status !== 401) {
                    toast.error(error.message || 'Failed to fetch users')
                }
            }
        },

        
        confirmDelete(user) {
            this.userToDelete = user
            this.showConfirmDialog = true
        },

        
        cancelDelete() {
            this.userToDelete = null
            this.showConfirmDialog = false
        },

        
        async performDelete() {
            if (!this.userToDelete || !this.userToDelete.id) return

            const usersStore = useUsersStore()

            try {
                await usersStore.deleteUser(this.userToDelete.id)
                this.showConfirmDialog = false
                this.userToDelete = null
                toast.success('User deleted successfully')
            } catch (error) {
                toast.error(error.message || 'Failed to delete user')
            }
        },
    },
})
