import { usersApi } from '@/services/api/usersApi'
import { toastHelpers } from '@/store/modules/utils/toast'
import { handleAsyncAction } from '@/store/modules/utils/stateHelpers'
import { createBaseStore } from '@/store/modules/utils/storeFactory'

export const useUsersStore = createBaseStore({
    id: 'users',
    api: usersApi,

    
    customState: () => ({
        
        list: [], 
    }),

    
    customGetters: {
        
        usersList: (state) => state.list || state.items,
        currentUser: (state) => state.current,
        usersLoading: (state) => state.loading,
        usersError: (state) => state.error,

        
        getUserById: (state) => (id) => (state.list || state.items).find((user) => user.id === id),
    },

    
    customActions: {
        
        async fetchUsers() {
            const users = await toastHelpers.handleLoad({
                entityName: 'Пользователи',
                operation: () => this.fetchAll(),
                silent: true,
            })

            this.list = users 
            return users
        },

        
        async fetchUserById(id) {
            return this.fetchById(id)
        },

        
        async createUser(userData) {
            const userName = userData.name || userData.username || 'User'

            return handleAsyncAction(this, async () => {
                return toastHelpers.handleCreate({
                    entityName: 'Пользователь',
                    displayName: userName,
                    operation: async () => {
                        const user = await this.create(userData)
                        
                        this.list = [...this.items]
                        return user
                    },
                })
            })
        },

        
        async updateUser({ id, userData }) {
            const userName = userData.name || userData.username || 'User'

            return handleAsyncAction(this, async () => {
                return toastHelpers.handleUpdate({
                    entityName: 'Пользователь',
                    displayName: userName,
                    operation: async () => {
                        const user = await this.update(id, userData)
                        
                        this.list = [...this.items]
                        return user
                    },
                })
            })
        },

        
        async deleteUser(id, userName = 'User') {
            return handleAsyncAction(this, async () => {
                
                let displayName = userName
                if (displayName === 'User' && this.current && this.current.id === id) {
                    displayName = this.current.name || this.current.username || 'User'
                }

                return toastHelpers.handleDelete({
                    entityName: 'Пользователь',
                    displayName,
                    operation: async () => {
                        const result = await this.delete(id)
                        
                        this.list = [...this.items]
                        return result
                    },
                })
            })
        },
    },
})
