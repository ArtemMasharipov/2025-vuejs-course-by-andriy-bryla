import { defineStore } from 'pinia'
import { toast } from '@/store/modules/utils/toast'
import { useAuthorsStore } from '@/store/modules/authors/authors'

export const useAuthorsUiStore = defineStore('authorsUi', {
    state: () => ({
        showForm: false,
        selectedAuthor: null,
        showDeleteConfirm: false,
        authorToDelete: null,
    }),

    getters: {
        getShowForm: (state) => state.showForm,
        getSelectedAuthor: (state) => state.selectedAuthor,
        getShowDeleteConfirm: (state) => state.showDeleteConfirm,
        getAuthorToDelete: (state) => state.authorToDelete,
    },

    actions: {
        
        async fetchAuthors() {
            const authorsStore = useAuthorsStore()

            try {
                await authorsStore.fetchAuthors()
                return authorsStore.authorsList
            } catch (error) {
                
                if (error.status !== 401) {
                    toast.error(error.message || 'Failed to fetch authors')
                }
                throw error
            }
        },

        
        async handleAction(action, ...args) {
            const authorsStore = useAuthorsStore()
            try {
                await action(...args)
                await this.fetchAuthors()
                this.closeForm()
                return true
            } catch (error) {
                toast.error(error.message || 'Action failed')
                throw error
            }
        },

        
        openCreateForm() {
            this.selectedAuthor = { _id: null, name: '', biography: '' }
            this.showForm = true
        },

        
        openEditForm(author) {
            this.selectedAuthor = { ...author }
            this.showForm = true
        },

        
        closeForm() {
            this.showForm = false
            this.selectedAuthor = null
        },

        
        async handleFormSubmit(formData) {
            const authorsStore = useAuthorsStore()

            const action = formData._id
                ? (data) => authorsStore.updateAuthor(data)
                : (data) => authorsStore.createAuthor(data)

            try {
                await this.handleAction(action, formData)
                toast.success(formData._id ? 'Author updated successfully' : 'Author created successfully')
                return true
            } catch (error) {
                return false
            }
        },

        
        handleDelete(authorId) {
            this.authorToDelete = authorId
            this.showDeleteConfirm = true
        },

        
        async confirmDelete() {
            const authorsStore = useAuthorsStore()

            try {
                await this.handleAction((id) => authorsStore.deleteAuthor(id), this.authorToDelete)
                toast.success('Author deleted successfully')
                this.showDeleteConfirm = false
                this.authorToDelete = null
                return true
            } catch (error) {
                return false
            }
        },

        
        cancelDelete() {
            this.showDeleteConfirm = false
            this.authorToDelete = null
        },
    },
})
