<template>
    <div class="product-manager">
        <Transition name="fade" mode="out-in">
            <div v-if="!selectedProduct" key="list">
                <product-list 
                    :products="products" 
                    @view-details="showProductDetails"
                    @buy="handleBuy"
                />
                <Transition name="fade">
                    <recently-viewed 
                        v-if="viewedProducts.length"
                        :products="viewedProducts" 
                        @view-details="showProductDetails"
                        @buy="handleBuy"
                        @clear="clearViewedProducts"
                    />
                </Transition>
            </div>
            <product-details
                v-else
                key="details"
                :product="selectedProduct"
                @back="closeDetails"
                @buy="handleBuy"
            />
        </Transition>
    </div>
</template>

<script>
import ProductList from './ProductList.vue'
import RecentlyViewed from './RecentlyViewed.vue'
import ProductDetails from './ProductDetails.vue'

export default {
    name: 'ProductManager',
    components: {
        ProductList,
        RecentlyViewed,
        ProductDetails
    },
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    emits: ['product-bought'],
    data() {
        return {
            selectedProduct: null,
            viewedProducts: [],
            storageKey: 'viewed-products'
        }
    },
    watch: {
        viewedProducts: {
            handler(newProducts) {
                localStorage.setItem(this.storageKey, JSON.stringify(newProducts))
            },
            deep: true
        }
    },
    created() {
        const savedProducts = localStorage.getItem(this.storageKey)
        if (savedProducts) {
            this.viewedProducts = JSON.parse(savedProducts)
        }
    },
    methods: {
        showProductDetails(product) {
            this.selectedProduct = product
            this.addToViewed(product)
        },
        addToViewed(product) {
            if (!this.viewedProducts.find(p => p.id === product.id)) {
                this.viewedProducts = [product, ...this.viewedProducts].slice(0, 4)
            }
        },
        clearViewedProducts() {
            this.viewedProducts = []
        },
        closeDetails() {
            this.selectedProduct = null
        },
        handleBuy(product) {
            const message = `Товар "${product.name}" додано до кошика`
            this.$emit('product-bought', { product, message })
        }
    }
}
</script>
