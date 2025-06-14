<template>
    <v-card variant="outlined" class="mb-4">
        <v-row no-gutters align="center">
            <v-col cols="12" sm="3" md="2">
                <v-img
                    :src="bookImage"
                    :alt="bookTitle"
                    @error="handleImageError"
                    height="160"
                    cover
                    class="rounded-ss-md rounded-es-md"
                ></v-img>
            </v-col>

            <v-col cols="12" sm="7" md="8">
                <v-card-item>
                    <v-card-title>{{ bookTitle }}</v-card-title>
                    <v-card-subtitle class="mt-1"> Price: ${{ formattedPrice }} </v-card-subtitle>

                    <div class="mt-3 d-flex align-center">
                        <span class="text-caption me-2">Quantity:</span>
                        <v-btn
                            icon="mdi-minus"
                            density="compact"
                            variant="outlined"
                            size="small"
                            class="mr-1"
                            :disabled="item.quantity <= 1"
                            @click="updateQuantity(item.quantity - 1)"
                        ></v-btn>

                        <span class="text-body-1 mx-2">{{ item.quantity }}</span>

                        <v-btn
                            icon="mdi-plus"
                            density="compact"
                            variant="outlined"
                            size="small"
                            class="ml-1"
                            @click="updateQuantity(item.quantity + 1)"
                        ></v-btn>
                    </div>

                    <div class="text-subtitle-1 font-weight-bold mt-3">
                        Total: ${{ (item.quantity * item.price).toFixed(2) }}
                    </div>
                </v-card-item>
            </v-col>

            <v-col cols="12" sm="2" md="2" class="d-flex align-center justify-end pr-4">
                <v-btn
                    color="error"
                    variant="text"
                    icon="mdi-delete"
                    size="small"
                    @click="confirmRemove"
                    :loading="removing"
                ></v-btn>
            </v-col>
        </v-row>

        <confirm-modal
            v-model="showDeleteConfirm"
            title="Remove Item"
            :message="`Are you sure you want to remove '${bookTitle}' from your cart?`"
            confirm-text="Remove"
            @confirm="remove"
        />
    </v-card>
</template>

<script>
import placeholderImage from '@/assets/images/placeholder.png'
import { toast, useCartStore } from '@/store'
import { debounce } from 'lodash'
import ConfirmModal from '../../ui/ConfirmModal.vue'

export default {
    name: 'CartItem',
    components: {
        ConfirmModal,
    },
    props: {
        
        item: {
            type: Object,
            required: true,
            validator: ({ bookId, quantity, price }) => bookId && Number.isFinite(quantity) && Number.isFinite(price),
        },
    },
    emits: ['error', 'update-quantity'],

    data() {
        return {
            removing: false,
            showDeleteConfirm: false,
        }
    },

    computed: {
        cartStore() {
            return useCartStore()
        },
        bookTitle() {
            const { title = 'Unknown Book' } = this.item.bookId || {}
            return title
        },
        bookImage() {
            return this.item?.bookId?.image || placeholderImage
        },
        formattedPrice() {
            return Number(this.item.price).toFixed(2)
        },
    },

    created() {
        
        this.updateQuantity = debounce(this.handleQuantityChange, 300)
    },
    methods: {
        
        confirmRemove() {
            this.showDeleteConfirm = true
        },

        
        async remove() {
            if (this.removing) return

            this.removing = true
            try {
                await this.cartStore.removeFromCart(this.item._id, this.bookTitle)
                
                await this.cartStore.fetchCart()
            } catch (error) {
                toast.error(`Failed to remove ${this.bookTitle}: ${error.message}`)
            } finally {
                this.removing = false
            }
        },

        
        handleImageError(e) {
            e.target.src = placeholderImage
        },

        
        handleQuantityChange(quantity) {
            if (quantity < 1) return

            this.$emit('update-quantity', {
                bookId: this.item.bookId._id,
                quantity,
                title: this.bookTitle,
            })

            this.cartStore
                .updateQuantity({
                    itemId: this.item._id,
                    bookId: this.item.bookId._id,
                    quantity,
                    title: this.bookTitle,
                })
                .then(() => {
                    
                    return this.cartStore.fetchCart()
                })
                .catch((error) => {
                    toast.error(`Failed to update quantity: ${error.message}`)
                })
        },
    },
}
</script>
