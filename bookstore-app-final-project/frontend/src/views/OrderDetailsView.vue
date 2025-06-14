<template>
    <v-container>
        <v-card class="mx-auto" max-width="800px">
            <v-card-title class="text-h4 mb-2">Order Details</v-card-title>

            <v-card-text v-if="loading" class="text-center py-5">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-card-text>

            <v-card-text v-else-if="error">
                <v-alert type="error" variant="tonal">{{ error }}</v-alert>
            </v-card-text>

            <template v-else>
                <v-card-text>
                    <v-row align="center" class="mb-4">
                        <v-col cols="12" sm="6">
                            <div class="text-h5">Order #{{ order._id }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="d-flex justify-end">
                            <v-chip :color="getStatusColor(order.status)" class="text-uppercase font-weight-medium">
                                {{ order.status }}
                            </v-chip>
                        </v-col>
                    </v-row>

                    <v-card variant="outlined" class="mb-4">
                        <v-card-title class="text-h6">Items</v-card-title>
                        <v-list density="compact">
                            <v-list-item v-for="item in order.items" :key="item.id" :title="item.title">
                                <template v-slot:append> {{ item.quantity }} x ${{ item.price }} </template>
                            </v-list-item>
                        </v-list>
                    </v-card>

                    <v-card variant="outlined" class="mb-4">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <p class="text-subtitle-1 font-weight-bold">
                                        Total: <span class="font-weight-regular">${{ order.total }}</span>
                                    </p>
                                    <p class="text-subtitle-1 font-weight-bold">
                                        Date: <span class="font-weight-regular">{{ formatDate(order.createdAt) }}</span>
                                    </p>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <p class="text-subtitle-1 font-weight-bold">
                                        Address: <span class="font-weight-regular">{{ order.address }}</span>
                                    </p>
                                    <p class="text-subtitle-1 font-weight-bold">
                                        Phone: <span class="font-weight-regular">{{ order.phone }}</span>
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <div v-if="authStore.hasPermission('update:order')" class="d-flex justify-end mt-4">
                        <v-btn color="primary" :to="`/orders/${order._id}/status`" prepend-icon="mdi-pencil">
                            Update Status
                        </v-btn>
                    </div>
                </v-card-text>
            </template>
        </v-card>
    </v-container>
</template>

<script>
import { useAuthStore, useOrdersStore } from '@/store'

export default {
    name: 'OrderDetailsView',
    computed: {
        ordersStore() {
            return useOrdersStore()
        },
        authStore() {
            return useAuthStore()
        },
        currentOrder() {
            return this.ordersStore.getOrder
        },
        loading() {
            return this.ordersStore.loading
        },
        error() {
            return this.ordersStore.error
        },
        order() {
            return this.currentOrder || {}
        },
    },
    async created() {
        await this.fetchOrderById(this.$route.params.id)
    },
    methods: {
        fetchOrderById(id) {
            return this.ordersStore.fetchOrderById(id)
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString()
        },
        getStatusColor(status) {
            const statusColors = {
                pending: 'warning',
                processing: 'info',
                shipped: 'success',
                delivered: 'primary',
                cancelled: 'error',
            }
            return statusColors[status] || 'grey'
        },
    },
}
</script>
