<template>
    <div class="admin-users">
        
        <admin-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            :total-items="totalItems"
            :page="page"
            :items-per-page="itemsPerPage"
            :sort-by="sortBy"
            :search="search"
            title="Users Management"
            @update:page="updatePage"
            @update:items-per-page="updateItemsPerPage"
            @update:sort-by="updateSortBy"
            @update:search="updateSearch"
            @reset-filters="resetFilters"
        >
            
            <template #actions>
                <v-btn color="primary" prepend-icon="mdi-plus" @click="openUserDialog()"> Add New User </v-btn>
            </template>

            
            <template #item.role="{ item }">
                <v-chip size="small" :color="getRoleColor(item.raw?.role?.name)" variant="tonal">
                    {{ item.raw?.role?.name || 'Unknown' }}
                </v-chip>
            </template>

            
            <template #item.actions="{ item }">
                <div class="d-flex justify-center">
                    <v-btn
                        icon
                        variant="text"
                        size="small"
                        color="primary"
                        class="mr-1"
                        @click="openUserDialog(item.raw)"
                    >
                        <v-icon>mdi-pencil</v-icon>
                        <v-tooltip activator="parent" location="top">Edit</v-tooltip>
                    </v-btn>
                    <v-btn icon variant="text" size="small" color="error" @click="confirmDeleteUser(item.raw)">
                        <v-icon>mdi-delete</v-icon>
                        <v-tooltip activator="parent" location="top">Delete</v-tooltip>
                    </v-btn>
                </div>
            </template>
        </admin-data-table>

        
        <v-dialog v-model="userDialogOpen" max-width="600px">
            <v-card>
                <v-card-title class="text-h5 bg-primary text-white">
                    {{ isEditMode ? 'Edit User' : 'Add New User' }}
                </v-card-title>

                <v-card-text class="pt-4">
                    <v-form ref="userForm" validate-on="submit">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="editedUser.username"
                                    label="Username"
                                    variant="outlined"
                                    density="comfortable"
                                    :rules="[(v) => !!v || 'Username is required']"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="editedUser.email"
                                    label="Email"
                                    variant="outlined"
                                    density="comfortable"
                                    :rules="[
                                        (v) => !!v || 'Email is required',
                                        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                                    ]"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="editedUser.password"
                                    label="Password"
                                    variant="outlined"
                                    density="comfortable"
                                    type="password"
                                    :rules="[
                                        (v) => !isEditMode || !!v || 'Password is required for new users',
                                        (v) => !v || v.length >= 8 || 'Password must be at least 8 characters',
                                    ]"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="editedUser.role"
                                    :items="roles"
                                    item-title="name"
                                    item-value="_id"
                                    label="Role"
                                    variant="outlined"
                                    density="comfortable"
                                    :rules="[(v) => !!v || 'Role is required']"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions class="pb-4 px-4">
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="userDialogOpen = false">Cancel</v-btn>
                    <v-btn color="primary" :loading="saving" @click="saveUser"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        
        <v-dialog v-model="deleteDialogOpen" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 bg-error text-white"> Confirm Delete </v-card-title>

                <v-card-text class="pt-4">
                    <p>
                        Are you sure you want to delete user
                        <strong>{{ userToDelete?.username || userToDelete?.email }}</strong
                        >? This action cannot be undone.
                    </p>
                </v-card-text>

                <v-card-actions class="pb-4 px-4">
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="deleteDialogOpen = false">Cancel</v-btn>
                    <v-btn color="error" :loading="deleting" @click="deleteUser"> Delete </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AdminDataTable from '@/components/features/admin/AdminDataTable.vue'
import { useUsersStore } from '@/store'

export default {
    name: 'AdminUsersView',
    components: {
        AdminDataTable,
    },

    data() {
        return {
            
            headers: [
                { title: 'Username', align: 'start', key: 'username' },
                { title: 'Email', align: 'start', key: 'email' },
                { title: 'Role', align: 'center', key: 'role' },
                { title: 'Registered', align: 'start', key: 'createdAt' },
                { title: 'Actions', align: 'center', key: 'actions', sortable: false },
            ],

            page: 1,
            itemsPerPage: 10,
            sortBy: [{ key: 'username', order: 'asc' }],
            search: '',
            totalItems: 0,

            
            userDialogOpen: false,
            deleteDialogOpen: false,
            isEditMode: false,
            editedUser: null,
            saving: false,
            deleting: false,
            userToDelete: null,

            
            roles: [],
        }
    },

    computed: {
        
        users() {
            const usersStore = useUsersStore()
            return usersStore.usersList || []
        },

        
        loading() {
            return useUsersStore().loading
        },
    },

    mounted() {
        this.loadUsers()
        this.loadRoles()
    },

    methods: {
        
        async loadUsers() {
            try {
                const usersStore = useUsersStore()
                await usersStore.fetchUsers()
                this.totalItems = usersStore.usersList?.length || 0
            } catch (error) {
                
            }
        },

        async loadRoles() {
            try {
                
                const response = await fetch('/api/v1/roles')
                this.roles = await response.json()
            } catch (error) {
                this.roles = []
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
            this.sortBy = [{ key: 'username', order: 'asc' }]
        },

        getRoleColor(role) {
            switch (role) {
                case 'admin':
                    return 'error'
                case 'moderator':
                    return 'warning'
                case 'user':
                    return 'primary'
                default:
                    return 'grey'
            }
        },

        
        openUserDialog(user = null) {
            if (user) {
                this.isEditMode = true
                this.editedUser = {
                    ...user,
                    password: '', 
                    role: user.role?._id || user.role,
                }
            } else {
                this.isEditMode = false
                this.editedUser = {
                    username: '',
                    email: '',
                    password: '',
                    role: '',
                }
            }
            this.userDialogOpen = true
        },

        
        async saveUser() {
            if (this.$refs.userForm && !this.$refs.userForm.validate().valid) {
                return
            }

            this.saving = true
            try {
                const usersStore = useUsersStore()
                if (this.isEditMode) {
                    await usersStore.updateUser(this.editedUser)
                } else {
                    await usersStore.createUser(this.editedUser)
                }
                this.userDialogOpen = false
                await this.loadUsers()
            } catch (error) {
                
            } finally {
                this.saving = false
            }
        },

        
        confirmDeleteUser(user) {
            this.userToDelete = user
            this.deleteDialogOpen = true
        },

        async deleteUser() {
            if (!this.userToDelete) return

            this.deleting = true
            try {
                const usersStore = useUsersStore()
                await usersStore.deleteUser(this.userToDelete._id)
                this.deleteDialogOpen = false
                await this.loadUsers()
            } catch (error) {
                
            } finally {
                this.deleting = false
            }
        },
    },
}
</script>

<style scoped>
.admin-users {
    width: 100%;
}
</style>
