import { carService } from '@/services/carApiService'

const INITIAL_FILTERS = {
    transportType: '',
    bodyTypes: [],
    brand: '',
    model: '',
    yearFrom: null,
    yearTo: null,
}

const createFilterPredicate = (filters) => (car) => {
    const conditions = [
        { check: filters.transportType, match: () => car.transportType === filters.transportType },
        { check: filters.bodyTypes.length, match: () => filters.bodyTypes.includes(car.bodyType) },
        { check: filters.brand, match: () => car.brand === filters.brand },
        { check: filters.model, match: () => car.model === filters.model },
        { check: filters.yearFrom, match: () => car.year >= filters.yearFrom },
        { check: filters.yearTo, match: () => car.year <= filters.yearTo },
    ]
    return conditions.every(({ check, match }) => !check || match())
}

const getDependentFilters = (currentFilters, updates) => {
    if ('transportType' in updates) {
        return { ...updates, brand: '', model: '', bodyTypes: [] }
    }
    if ('brand' in updates && !('model' in updates)) {
        return { ...updates, model: '' }
    }
    return updates
}

export default {
    namespaced: true,
    state: () => ({
        cars: [],
        filters: { ...INITIAL_FILTERS },
        isLoading: false,
        filtersData: {
            transportTypes: [],
            bodyTypes: [],
            brands: {},
            models: {},
        },
    }),
    getters: {
        allCars: (state) => state.cars,
        availableTransportTypes: (state) => state.filtersData.transportTypes,
        availableBodyTypes: (state) => state.filtersData.bodyTypes,
        availableBrands: (state) => state.filtersData.brands[state.filters.transportType] || [],
        availableModels: (state) => state.filtersData.models[state.filters.brand] || [],
        isLoading: (state) => state.isLoading,
        filteredCars: (state) => state.cars.filter(createFilterPredicate(state.filters)),
        hasActiveFilters: (state) =>
            Object.entries(state.filters).some(([key, value]) => {
                if (Array.isArray(value)) return value.length > 0
                if (key.startsWith('year')) return value !== null
                return Boolean(value)
            }),
        filters: (state) => state.filters,
    },
    mutations: {
        SET_CARS: (state, cars) => {
            state.cars = [...cars]
        },
        SET_FILTERS: (state, filters) => {
            state.filters = { ...state.filters, ...filters }
        },
        SET_LOADING: (state, isLoading) => {
            state.isLoading = isLoading
        },
        SET_FILTERS_DATA: (state, data) => {
            state.filtersData = { ...data }
        },
        RESET_FILTERS: (state) => {
            state.filters = { ...INITIAL_FILTERS }
        },
    },
    actions: {
        async initializeCars({ commit, dispatch }) {
            commit('SET_LOADING', true)
            try {
                const { cars, filters } = await carService.fetchInitialData()
                await dispatch('setInitialData', { cars, filters })
            } catch (error) {
                console.error('Failed to load cars:', error)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        setInitialData({ commit }, { cars, filters }) {
            commit('SET_CARS', cars)
            commit('SET_FILTERS_DATA', filters)
        },
        updateFilters({ commit, state }, updates) {
            const newFilters = getDependentFilters(state.filters, updates)
            commit('SET_FILTERS', newFilters)
        },
        resetFilters({ commit }) {
            commit('RESET_FILTERS')
        },
    },
}
