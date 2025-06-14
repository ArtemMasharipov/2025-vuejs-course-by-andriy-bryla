import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        dialog: {
            visible: false,
            type: null,
            data: null,
        },
        windowWidth: window.innerWidth,
        searchQueries: {},
    }),

    getters: {
        isMobile: (state) => state.windowWidth < 600,
        dialogVisible: (state) => state.dialog.visible,
        dialogType: (state) => state.dialog.type,
        dialogData: (state) => state.dialog.data,
        getSearchQuery: (state) => (moduleKey) => state.searchQueries[moduleKey] || '',
    },

    actions: {
        openDialog(type, data = null) {
            this.dialog = {
                visible: true,
                type,
                data,
            }
        },

        closeDialog() {
            this.dialog = {
                visible: false,
                type: null,
                data: null,
            }
        },

        handleWindowResize() {
            this.windowWidth = window.innerWidth
        },

        setSearchQuery(moduleKey, query) {
            this.searchQueries = {
                ...this.searchQueries,
                [moduleKey]: query,
            }
        },

        clearSearchQuery(moduleKey) {
            const { [moduleKey]: _, ...rest } = this.searchQueries
            this.searchQueries = rest
        },
    },
})
