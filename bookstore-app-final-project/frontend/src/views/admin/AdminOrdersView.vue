<template>
    <div class="admin-orders">
        
        <admin-data-table
            :headers="headers"
            :items="orders"
            :loading="loading"
            :total-items="totalItems"
            :page="page"
            :items-per-page="itemsPerPage"
            :sort-by="sortBy"
            :search="search"
            title="Orders Management"
            @update:page="updatePage"
            @update:items-per-page="updateItemsPerPage"
            @update:sort-by="updateSortBy"
            @update:search="updateSearch"
            @reset-filters="resetFilters"
        >
            
            <template #actions>
                <v-btn color="primary" prepend-icon="mdi-reload" @click="loadOrders"> Refresh Orders </v-btn>
            </template>

            
            <template #item.status="{ item }">
                <v-chip size="small" :color="getStatusColor(item.raw?.status)" class="text-uppercase">
                    {{ item.raw?.status || 'Unknown' }}
                </v-chip>
            </template>

            
            <template #item.totalPrice="{ item }">
                ${{ item.raw && item.raw.totalPrice !== undefined ? item.raw.totalPrice.toFixed(2) : '0.00' }}
            </template>

            
            <template #item.actions="{ item }">
                <div class="d-flex justify-center">
                    <v-btn
                        icon
                        variant="text"
                        size="small"
                        color="primary"
                        class="mr-1"
                        @click="viewOrderDetails(item.raw)"
                    >
                        <v-icon>mdi-eye</v-icon>
                        <v-tooltip activator="parent" location="top">View Details</v-tooltip>
                    </v-btn>
                    <v-btn
                        icon
                        variant="text"
                        size="small"
                        color="warning"
                        class="mr-1"
                        @click="updateOrderStatus(item.raw)"
                    >
                        <v-icon>mdi-pencil</v-icon>
                        <v-tooltip activator="parent" location="top">Update Status</v-tooltip>
                    </v-btn>
                </div>
            </template>
        </admin-data-table>

        
        <v-dialog v-model="detailsDialogOpen" max-width="800px">
            <v-card v-if="selectedOrder">
                <v-card-title class="text-h5 bg-primary text-white">
                    Order Details: #{{ selectedOrder._id }}
                </v-card-title>

                <v-card-text class="pt-4">
                    <v-row>
                        <v-col cols="12" md="6">
                            <p><strong>Customer:</strong> {{ selectedOrder.userId?.username || 'Unknown' }}</p>
                            <p><strong>Date:</strong> {{ new Date(selectedOrder.createdAt).toLocaleString() }}</p>
                            <p>
                                <strong>Status:</strong>
                                <v-chip
                                    size="small"
                                    :color="getStatusColor(selectedOrder.status)"
                                    class="text-uppercase"
                                >
                                    {{ selectedOrder.status }}
                                </v-chip>
                            </p>
                            <p><strong>Total Amount:</strong> ${{ selectedOrder.totalPrice?.toFixed(2) }}</p>
                        </v-col>

                        <v-col cols="12" md="6" v-if="selectedOrder.shippingAddress">
                            <p><strong>Shipping Address:</strong></p>
                            <p>{{ selectedOrder.shippingAddress.street }}</p>
                            <p>{{ selectedOrder.shippingAddress.city }}, {{ selectedOrder.shippingAddress.zipCode }}</p>
                            <p>{{ selectedOrder.shippingAddress.country }}</p>
                        </v-col>
                    </v-row>

                    <v-divider class="my-4"></v-divider>

                    <h3 class="text-h6 mb-3">Order Items</h3>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th class="text-right">Price</th>
                                <th class="text-right">Quantity</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in selectedOrder.items" :key="i">
                                <td>{{ item.bookId?.title || 'Unknown Book' }}</td>
                                <td class="text-right">${{ item.price?.toFixed(2) }}</td>
                                <td class="text-right">{{ item.quantity }}</td>
                                <td class="text-right">${{ (item.price * item.quantity).toFixed(2) }}</td>
                            </tr>
                            <tr class="font-weight-bold">
                                <td colspan="3" class="text-right">Total:</td>
                                <td class="text-right">${{ selectedOrder.totalPrice?.toFixed(2) }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>

                <v-card-actions class="pb-4 px-4">
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="detailsDialogOpen = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        
        <v-dialog v-model="statusDialogOpen" max-width="500px">
            <v-card v-if="selectedOrder">
                <v-card-title class="text-h5 bg-primary text-white"> Update Order Status </v-card-title>

                <v-card-text class="pt-4">
                    <v-select
                        v-model="editedStatus"
                        :items="['pending', 'processing', 'shipped', 'delivered', 'cancelled']"
                        label="Status"
                        variant="outlined"
                    ></v-select>
                </v-card-text>

                <v-card-actions class="pb-4 px-4">
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="statusDialogOpen = false">Cancel</v-btn>
                    <v-btn color="primary" :loading="saving" @click="saveOrderStatus"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AdminDataTable from '@/components/features/admin/AdminDataTable.vue'
import { useOrdersStore } from '@/store'

export default {
    name: 'AdminOrdersView',
    components: {
        AdminDataTable,
    },

    data() {
        return {
            
            headers: [
                { title: 'Order ID', align: 'start', key: '_id' },
                { title: 'Customer', align: 'start', key: 'customer' },
                { title: 'Date', align: 'start', key: 'createdAt' },
                { title: 'Total', align: 'start', key: 'totalPrice' },
                { title: 'Status', align: 'center', key: 'status' },
                { title: 'Actions', align: 'center', key: 'actions', sortable: false },
            ],

            page: 1,
            itemsPerPage: 10,
            sortBy: [{ key: 'createdAt', order: 'desc' }],
            search: '',
            totalItems: 0,

            
            detailsDialogOpen: false,
            statusDialogOpen: false,
            selectedOrder: null,
            editedStatus: '',
            saving: false,
        }
    },

    computed: {
        
        orders() {
            const ordersStore = useOrdersStore()
            if (!ordersStore.ordersList || ordersStore.ordersList.length === 0) {
                return []
            }

            return (
                ordersStore.ordersList.map((order) => ({
                    ...order,
                    customer: order.userId?.username || order.userId?.email || 'Unknown',
                    createdAt: new Date(order.createdAt).toLocaleDateString(),
                })) || []
            )
        },

        
        loading() {
            return useOrdersStore().loading
        },
    },

    mounted() {
        this.loadOrders()
    },

    methods: {
        
        async loadOrders() {
            try {
                const ordersStore = useOrdersStore()
                await ordersStore.fetchOrders()
                this.totalItems = ordersStore.ordersList?.length || 0
            } catch (error) {
                
            }
        },

        
        updatePage(page) {
            this.page = page
        },

        updateItemsPerPage(itemsPerPage) {
            this.itemsPerPage = itemsPerPage
        },

        updateSortBy(sortBy) {
            this.sortBy = sortBy
        },

        updateSearch(search) {
            this.search = search
        },

        resetFilters() {
            this.page = 1
            this.search = ''
            this.sortBy = [{ key: 'createdAt', order: 'desc' }]
        },

        getStatusColor(status) {
            switch (status) {
                case 'pending':
                    return 'warning'
                case 'processing':
                    return 'info'
                case 'shipped':
                    return 'primary'
                case 'delivered':
                    return 'success'
                case 'cancelled':
                    return 'error'
                default:
                    return 'grey'
            }
        },

        
        viewOrderDetails(order) {
            this.selectedOrder = order
            this.detailsDialogOpen = true
        },

        
        updateOrderStatus(order) {
            this.selectedOrder = order
            this.editedStatus = order.status
            this.statusDialogOpen = true
        },

        async saveOrderStatus() {
            if (!this.selectedOrder) return

            this.saving = true
            try {
                const ordersStore = useOrdersStore()
                const updatedOrder = {
                    ...this.selectedOrder,
                    status: this.editedStatus,
                }
                await ordersStore.updateOrder(updatedOrder)
                this.statusDialogOpen = false
                await this.loadOrders()
            } catch (error) {
                
            } finally {
                this.saving = false
            }
        },
    },
}
</script>

<style scoped>
.admin-orders {
    width: 100%;
}
</style>
