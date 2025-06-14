<template>
    <v-container class="login-page fill-height" fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="login-container elevation-3">
                    <v-card-title class="text-center">Login</v-card-title>
                    <v-card-text>
                        <v-form class="auth-form" @submit.prevent="handleSubmit">
                            <v-text-field
                                id="email"
                                v-model="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                required
                                autocomplete="username"
                            ></v-text-field>

                            <v-text-field
                                id="password"
                                v-model="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                required
                                autocomplete="current-password"
                            ></v-text-field>

                            <v-btn type="submit" color="primary" block :loading="authLoading" class="mt-4">
                                {{ authLoading ? 'Logging in...' : 'Login' }}
                            </v-btn>

                            <v-alert v-if="authError" type="error" class="mt-4" density="compact">
                                {{ authError }}
                            </v-alert>

                            <div class="text-center mt-4">
                                Don't have an account?
                                <v-btn variant="text" color="primary" to="/register" class="ps-1" density="compact">
                                    Register
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore, useAuthUiStore } from '@/store'

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        authStore() {
            return useAuthStore()
        },
        authUiStore() {
            return useAuthUiStore()
        },
        authLoading() {
            return this.authStore.loading
        },
        authError() {
            return this.authStore.error
        },
        isAuthenticated() {
            return this.authStore.isAuthenticated
        },
        currentUser() {
            return this.authStore.currentUser
        },
    },
    methods: {
        async handleSubmit() {
            this.authUiStore.clearError()
            
            const success = await this.authUiStore.handleLogin({
                email: this.email,
                password: this.password,
            })

            if (success && this.isAuthenticated) {
                const redirectPath = localStorage.getItem('redirectPath')
                if (redirectPath) {
                    localStorage.removeItem('redirectPath')
                    this.$router.push(redirectPath)
                } else {
                    this.$router.push('/')
                }
            }
        },
    },
}
</script>

<style scoped>
.login-page {
    background-color: var(--gray-light);
}

.auth-form {
    width: 100%;
}
</style>
