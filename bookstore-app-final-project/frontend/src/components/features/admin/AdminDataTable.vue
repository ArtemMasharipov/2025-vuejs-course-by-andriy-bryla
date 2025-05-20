<template>
    <div class="admin-data-table">
        
        <v-card class="mb-4" variant="flat" v-if="showFilters">
            <v-card-text>
                <v-row>
                    
                    <v-col cols="12" sm="6" md="4" v-if="showSearch">
                        <v-text-field
                            v-model="searchQuery"
                            :label="searchLabel"
                            density="comfortable"
                            variant="outlined"
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            clearable
                            @update:model-value="onSearchChange"
                        ></v-text-field>
                    </v-col>

                    
                    <slot name="filters"></slot>

                    
                    <v-col cols="12" sm="auto" class="d-flex align-center justify-end" v-if="showResetFilters">
                        <v-btn
                            variant="text"
                            color="primary"
                            prepend-icon="mdi-filter-remove-outline"
                            @click="$emit('reset-filters')"
                        >
                            Reset filters
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        
        <v-card>
            
            <v-toolbar density="comfortable" color="transparent" v-if="title || $slots.actions">
                <v-toolbar-title v-if="title">
                    {{ title }}
                    <span v-if="subtitle" class="text-subtitle-2 text-medium-emphasis ms-2">({{ subtitle }})</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                
                <slot name="actions"></slot>
            </v-toolbar>

            
            <v-data-table-server
                v-model:items-per-page="itemsPerPageSync"
                v-model:page="pageSync"
                v-model:sort-by="sortBySync"
                :headers="headers"
                :items="items"
                :items-length="totalItems"
                :loading="loading"
                :items-per-page-options="itemsPerPageOptions"
                class="elevation-0"
            >
                
                <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotData">
                    <slot :name="slotName" v-bind="slotData"></slot>
                </template>

                
                <template #no-data>
                    <div class="d-flex flex-column align-center py-8">
                        <v-icon size="64" :color="emptyStateColor" class="mb-4">{{ emptyStateIcon }}</v-icon>
                        <h3 class="text-h6 mb-2">{{ emptyStateTitle }}</h3>
                        <p class="text-body-2 text-medium-emphasis mb-4">
                            {{ loading ? loadingText : emptyStateText }}
                        </p>
                        <v-btn v-if="showResetFilters && !loading" color="primary" @click="$emit('reset-filters')">
                            Reset filters
                        </v-btn>
                    </div>
                </template>
            </v-data-table-server>
        </v-card>
    </div>
</template>

<script>
import { debounce } from 'lodash-es'

export default {
    name: 'AdminDataTable',
    props: {
        
        headers: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },

        
        page: {
            type: Number,
            default: 1,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        totalItems: {
            type: Number,
            default: 0,
        },
        itemsPerPageOptions: {
            type: Array,
            default: () => [5, 10, 25, 50],
        },

        
        sortBy: {
            type: Array,
            default: () => [],
        },

        
        search: {
            type: String,
            default: '',
        },
        searchLabel: {
            type: String,
            default: 'Search',
        },
        searchDebounce: {
            type: Number,
            default: 300,
        },
        showSearch: {
            type: Boolean,
            default: true,
        },

        
        showFilters: {
            type: Boolean,
            default: true,
        },
        showResetFilters: {
            type: Boolean,
            default: true,
        },

        
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },

        
        emptyStateTitle: {
            type: String,
            default: 'No data found',
        },
        emptyStateText: {
            type: String,
            default: 'No items match your current filters',
        },
        emptyStateIcon: {
            type: String,
            default: 'mdi-database-off-outline',
        },
        emptyStateColor: {
            type: String,
            default: 'grey',
        },
        loadingText: {
            type: String,
            default: 'Loading data...',
        },
    },

    emits: ['update:page', 'update:items-per-page', 'update:sort-by', 'update:search', 'reset-filters'],

    data() {
        return {
            searchQuery: this.search,
        }
    },

    computed: {
        pageSync: {
            get() {
                return this.page
            },
            set(value) {
                this.$emit('update:page', value)
            },
        },

        itemsPerPageSync: {
            get() {
                return this.itemsPerPage
            },
            set(value) {
                this.$emit('update:items-per-page', value)
            },
        },

        sortBySync: {
            get() {
                return this.sortBy
            },
            set(value) {
                this.$emit('update:sort-by', value)
            },
        },
    },

    watch: {
        search(newValue) {
            this.searchQuery = newValue
        },
    },

    methods: {
        onSearchChange() {
            this.debouncedSearch()
        },
    },

    created() {
        
        this.debouncedSearch = debounce(() => {
            this.$emit('update:search', this.searchQuery)
        }, this.searchDebounce)
    },
}
</script>

<style scoped>
.admin-data-table {
    width: 100%;
}
</style>
