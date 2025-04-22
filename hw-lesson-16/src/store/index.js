import { createStore } from 'vuex'
import auth from './modules/auth'
import cart from './modules/cart'
import localization from './modules/localization'
import products from './modules/products'

export default createStore({
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        localization,
        products,
        cart
    },
})
