<template>
    <v-form class="auth-form" @submit.prevent="handleSubmit">
        <v-text-field id="username" v-model="username" label="Username" variant="outlined" required></v-text-field>

        <v-text-field id="email" v-model="email" label="Email" variant="outlined" type="email" required></v-text-field>

        <v-text-field
            id="password"
            v-model="password"
            label="Password"
            variant="outlined"
            type="password"
            required
        ></v-text-field>

        <v-text-field
            id="confirmPassword"
            v-model="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
        ></v-text-field>

        <v-btn type="submit" color="primary" block :loading="authLoading" class="mt-4">
            {{ authLoading ? 'Creating Account...' : 'Register' }}
        </v-btn>

        <v-alert v-if="authError" type="error" class="mt-4">
            {{ authError }}
        </v-alert>
    </v-form>
</template>

<script>
import { useAuthStore, useAuthUiStore } from '@/store'

export default {
    name: 'RegisterForm',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
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
    },
    methods: {
        async handleSubmit() {
            
            this.authUiStore.clearError()

            const success = await this.authUiStore.handleRegister({
                username: this.username,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
            })

            if (success) {
                this.$router.push('/')
            }
        },
    },
}
</script>

<style scoped>
.auth-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}
</style>
