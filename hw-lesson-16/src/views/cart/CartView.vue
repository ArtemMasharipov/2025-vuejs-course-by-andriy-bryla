<template>
    <v-container>
        <h1 class="text-h4 mb-4">{{ $t('cart.title') }}</h1>
        <div v-if="loading" class="d-flex justify-center my-8">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </div>
        <v-alert v-else-if="error" type="error" class="my-4">
            {{ error }}
        </v-alert>
        <v-alert v-else-if="!cartItems.length" type="info" class="my-4">
            <p>{{ $t('cart.empty') }}</p>
            <div class="mt-4">
                <v-btn color="primary" class="me-2" :to="{ name: 'products' }">
                    {{ $t('cart.continueShopping') }}
                </v-btn>
                <v-btn color="secondary" :to="{ name: 'home' }">
                    {{ $t('errors.returnHome') }}
                </v-btn>
            </div>
        </v-alert>
        <template v-else>
            <v-row>
                <v-col cols="12" md="8">
                    <cart-item v-for="item in cartItems" :key="item.productId" :item="item" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-4">
                        <v-card-title class="text-h5">
                            {{ $t('cart.summary') }}
                        </v-card-title>
                        <v-divider class="my-3"></v-divider>
                        <v-list density="compact">
                            <v-list-item v-for="item in cartItems" :key="item.productId">
                                <v-list-item-title>
                                    {{ item.title }} ({{ item.quantity }})
                                </v-list-item-title>
                                <template v-slot:append>
                                    ${{ formatPrice(item.price * item.quantity) }}
                                </template>
                            </v-list-item>
                            <v-divider class="my-2"></v-divider>
                            <v-list-item>
                                <v-list-item-title class="text-h6 font-weight-bold">
                                    {{ $t('cart.total') }}
                                </v-list-item-title>
                                <template v-slot:append>
                                    <span class="text-h6 font-weight-bold">${{ formatPrice(cartTotal) }}</span>
                                </template>
                            </v-list-item>
                        </v-list>
                        <v-card-actions class="d-flex flex-column align-stretch gap-2 mt-4">
                            <v-btn color="primary" block size="large">
                                {{ $t('cart.checkout') }}
                            </v-btn>
                            <v-btn variant="outlined" color="error" block @click="confirmClearCart">
                                {{ $t('cart.clear') }}
                            </v-btn>
                            <v-btn variant="text" block :to="{ name: 'products' }">
                                {{ $t('cart.continueShopping') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <v-dialog v-if="dialogs.clear" v-model="dialogs.clear.open" max-width="400">
            <v-card>
                <v-card-title class="text-h5">
                    {{ $t('cart.confirmClear') }}
                </v-card-title>
                <v-card-text>
                    {{ $t('cart.clearConfirmMessage') }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="closeDialog({}, 'clear')">
                        {{ $t('common.cancel') }}
                    </v-btn>
                    <v-btn color="error" variant="elevated" @click="handleClearCart" :loading="dialogs.clear.loading">
                        {{ $t('common.delete') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import CartItem from '@/components/features/cart/CartItem.vue';
import dialogHandlerMixin from '@/mixins/dialogHandlerMixin';
import { formatPrice } from '@/services/utils/formatters';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'CartView',
    mixins: [dialogHandlerMixin],
    components: {
        CartItem
    },
    data() {
        return {
            dialogs: {
                clear: {
                    open: false,
                    loading: false,
                    item: {}
                }
            }
        };
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/cartItems',
            cartTotal: 'cart/cartTotal',
            loading: 'cart/loading',
            error: 'cart/error'
        })
    },
    created() {
        this.loadCart();
    },
    methods: {
        ...mapActions({
            clearCart: 'cart/clearCart',
            loadCart: 'cart/loadCartFromFirestore'
        }),
        formatPrice,
        confirmClearCart() {
            this.dialogs.clear.open = true;
        },
        async handleClearCart() {
            this.dialogs.clear.loading = true;
            try {
                await this.clearCart();
                this.closeDialog({}, 'clear');
            } catch (error) {
            } finally {
                this.dialogs.clear.loading = false;
            }
        }
    }
};
</script>