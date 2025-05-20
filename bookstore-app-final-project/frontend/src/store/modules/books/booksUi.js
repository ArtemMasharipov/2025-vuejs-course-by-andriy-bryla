import { debounce } from 'lodash'
import { defineStore } from 'pinia'
import { toast } from '@/store/modules/utils/toast'
import { useBooksStore } from '@/store/modules/books/books'
import { useUiStore } from '@/store/modules/ui/ui'

export const useBooksUiStore = defineStore('booksUi', {
    state: () => ({
        showForm: false,
        selectedBook: null,
        bookToDelete: null,
        currentPage: 1,
        formSubmitting: false,
        itemsPerPage: 12,
        category: null,
        authorId: null,
    }),
    getters: {
        
        showDeleteDialog: (state) => !!state.bookToDelete,
        filterParams: (state) => {
            const uiStore = useUiStore()
            const params = {
                page: state.currentPage,
                limit: state.itemsPerPage,
            }

            const searchQuery = uiStore.getSearchQuery('books')
            if (searchQuery) {
                params.search = searchQuery
            }

            if (state.category) {
                params.category = state.category
            }

            if (state.authorId) {
                params.author = state.authorId
            }

            return params
        },
        
        getShowForm: (state) => state.showForm,
        getSelectedBook: (state) => state.selectedBook,
        getBookToDelete: (state) => state.bookToDelete,
        getCurrentPage: (state) => state.currentPage,
        getFormSubmitting: (state) => state.formSubmitting,
        getItemsPerPage: (state) => state.itemsPerPage,
        getCategory: (state) => state.category,
        getAuthorId: (state) => state.authorId,
    },

    actions: {
        
        initialize({ category = null, authorId = null, itemsPerPage = 12 }) {
            this.category = category
            this.authorId = authorId
            this.itemsPerPage = itemsPerPage
        },

        
        openCreateForm() {
            this.selectedBook = {}
            this.showForm = true
        },

        
        openEditForm(book) {
            this.selectedBook = { ...book }
            this.showForm = true
        },

        
        closeForm() {
            this.selectedBook = null
            this.showForm = false
        },

        
        confirmDeleteBook(book) {
            this.bookToDelete = book
        },

        
        cancelDeleteBook() {
            this.bookToDelete = null
        },
        
        async handleFormSubmit(bookData) {
            const booksStore = useBooksStore()

            try {
                this.formSubmitting = true

                if (bookData._id) {
                    await booksStore.updateBook({ id: bookData._id, formData: bookData.formData })
                    toast.success('Book updated successfully')
                } else {
                    await booksStore.createBook(bookData.formData)
                    toast.success('Book created successfully')
                }

                await this.loadBooks()
                this.closeForm()
            } catch (error) {
                toast.error(error.message || 'Failed to save book')
            } finally {
                this.formSubmitting = false
            }
        },

        
        async deleteBook() {
            if (!this.bookToDelete?._id) return

            const booksStore = useBooksStore()

            try {
                await booksStore.deleteBook(this.bookToDelete._id)
                toast.success(`'${this.bookToDelete.title}' was deleted successfully`)
                this.bookToDelete = null
                await this.loadBooks()
            } catch (error) {
                toast.error(error?.message || 'Failed to delete book')
            }
        },

        
        changePage(page) {
            this.currentPage = page
            this.loadBooks()
        },

        
        setSearchQueryDebounced(query) {
            const uiStore = useUiStore()
            uiStore.setSearchQuery('books', query)

            
            this.currentPage = 1
            this.loadBooks()
        },
        
        async loadBooks() {
            const booksStore = useBooksStore()
            try {
                await booksStore.fetchBooks(this.filterParams)
            } catch (error) {
                
                if (error.status !== 401) {
                    toast.error(error.message || 'Failed to load books')
                }
            }
        },

        
        setupSearchDebounce() {
            
            this.debouncedSearch = debounce((query) => {
                this.setSearchQueryDebounced(query)
            }, 500)
        },
    },
})
