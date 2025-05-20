import { authorsApi } from '@/services/api/authorsApi'
import { toast } from '@/store/modules/utils/toast'
import { handleAsyncAction } from '@/store/modules/utils/stateHelpers'
import { createBaseStore } from '@/store/modules/utils/storeFactory'

export const useAuthorsStore = createBaseStore({
    id: 'authors',
    api: authorsApi,

    
    customState: () => ({
        
        list: [], 
        searchQuery: '', 
    }),

    
    customGetters: {
        
        authorsList: (state) => state.list || state.items,
        currentAuthor: (state) => state.current,
        authorsLoading: (state) => state.loading,
        authorsError: (state) => state.error,
    },

    
    customActions: {
        
        async fetchAuthors() {
            
            const authors = await this.fetchAll()
            this.list = authors 
            return authors
        },

        
        async fetchAuthorById(id) {
            const author = await this.fetchById(id)
            return author
        },
        
        async createAuthor(authorData) {
            return handleAsyncAction(this, async () => {
                try {
                    const author = await this.create(authorData)
                    
                    this.list = [...this.items]

                    const authorName = authorData.name || 'Author'
                    toast.success(`Author "${authorName}" created successfully`)

                    return author
                } catch (error) {
                    toast.error(`Failed to create author: ${error.message}`)
                    throw error
                }
            })
        },
        
        async updateAuthor(authorData) {
            return handleAsyncAction(this, async () => {
                try {
                    if (!authorData || (!authorData._id && !authorData.id)) {
                        throw new Error('Author ID is required for update')
                    }

                    const id = authorData._id || authorData.id
                    const author = await this.update(id, authorData)
                    
                    this.list = [...this.items]

                    const authorName = authorData.name || author.name || 'Author'
                    toast.success(`Author "${authorName}" updated successfully`)

                    return author
                } catch (error) {
                    toast.error(`Failed to update author: ${error.message}`)
                    throw error
                }
            })
        },
        
        async deleteAuthor(authorId, authorName = 'Author') {
            return handleAsyncAction(this, async () => {
                try {
                    
                    let displayName = authorName
                    if (
                        displayName === 'Author' &&
                        this.current &&
                        (this.current.id === authorId || this.current._id === authorId)
                    ) {
                        displayName = this.current.name || 'Author'
                    }

                    const result = await this.delete(authorId)
                    
                    this.list = [...this.items]

                    toast.info(`Author "${displayName}" deleted successfully`)
                    return result
                } catch (error) {
                    toast.error(`Failed to delete author: ${error.message}`)
                    throw error
                }
            })
        },

        
        setSearchQuery(query) {
            this.searchQuery = query
            
            this.applyFilters({ search: query })
        },
    },
})
