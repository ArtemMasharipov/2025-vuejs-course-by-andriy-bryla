import { booksApi } from '@/services/api/booksApi'
import { handleAsyncAction } from '@/store/modules/utils/stateHelpers'
import { createBaseStore } from '@/store/modules/utils/storeFactory'
import { toast } from '@/store/modules/utils/toast'

export const useBooksStore = createBaseStore({
    id: 'books',
    api: booksApi,

    
    customState: () => ({
        
        list: {
            books: [],
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            },
        },
    }),
    
    customGetters: {
        booksList: (state) => state.list.books,
        booksPagination: (state) => state.list.pagination,
        currentBook: (state) => state.current,
        booksLoading: (state) => state.loading,
        booksError: (state) => state.error,
    },

    
    customActions: {
        
        async fetchBooks(params = { page: 1, limit: 10 }) {
            return handleAsyncAction(this, async () => {
                try {
                    const response = await booksApi.fetchAll(params);
                    this.setBooksList(response);
                    return response;
                } catch (error) {
                    throw error;
                }
            })
        },

        
        async fetchBookById(id) {
            return handleAsyncAction(this, async () => {
                const book = await booksApi.fetchById(id)
                this.current = book
                return book
            })
        },
        
        async createBook(formData) {
            return handleAsyncAction(
                this,
                async () => {
                    const book = await booksApi.create(formData)
                    this.list.books.push(book)

                    
                    const title =
                        formData instanceof FormData
                            ? formData.get('title') || 'New book'
                            : formData.title || 'New book'
                    toast.success(`"${title}" has been created successfully`)

                    return book
                },
                {
                    onError: (error) => {
                        toast.error(`Failed to create book: ${error.message}`)
                    },
                }
            )
        },
        
        async updateBook({ id, formData }) {
            return handleAsyncAction(
                this,
                async () => {
                    const updatedBook = await booksApi.update(id, formData)
                    const index = this.list.books.findIndex((book) => book._id === updatedBook._id)
                    if (index !== -1) {
                        this.list.books.splice(index, 1, updatedBook)
                    }

                    
                    toast.success(`"${updatedBook.title || 'Book'}" has been updated successfully`)

                    return updatedBook
                },
                {
                    onError: (error) => {
                        toast.error(`Failed to update book: ${error.message}`)
                    },
                }
            )
        },
        
        async deleteBook(id, title = '') {
            if (!id) throw new Error('Book ID is required')

            return handleAsyncAction(
                this,
                async () => {
                    
                    if (!title) {
                        const book = this.list.books.find((b) => b._id === id)
                        title = book?.title || 'Book'
                    }

                    await booksApi.delete(id)
                    this.list.books = this.list.books.filter((book) => book._id !== id)

                    
                    toast.warning(`"${title}" has been deleted`)
                },
                {
                    onError: (error) => {
                        toast.error(`Failed to delete book: ${error.message}`)
                    },
                }
            )
        },

        
        setBooksList(response) {
            const normalizeBooks = (books) => {
                return books.map(book => {
                    return book;
                });
            };
            
            if (Array.isArray(response)) {
                
                this.list.books = normalizeBooks(response);
                
                this.list.pagination = {
                    page: 1,
                    limit: response.length,
                    total: response.length,
                    pages: 1,
                }
            } else if (response && typeof response === 'object') {
                
                const books = response.books || response.data || [];
                this.list.books = normalizeBooks(books);
                this.list.pagination = response.pagination || {
                    page: 1,
                    limit: this.list.books.length,
                    total: this.list.books.length,
                    pages: 1,
                }
            } else {
                
                this.list.books = []
                this.list.pagination = {
                    page: 1,
                    limit: 10,
                    total: 0,
                    pages: 1,
                }
            }
        },
    },
})
