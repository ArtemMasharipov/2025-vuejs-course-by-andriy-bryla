import { createStore } from 'vuex'
import carsShop from './modules/carsShop'
import productsCatalog from './modules/productsCatalog'

export default createStore({
    modules: {
        productsCatalog,
        carsShop,
    },
})
