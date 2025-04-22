<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-card width="400" elevation="8" class="pa-4">
      <v-card-title class="text-h4 text-center mb-4">
        {{ $t('auth.login') }}
      </v-card-title>

      <v-card-text>
        <p class="text-body-1 text-center mb-6">
          Sign in to access your account, manage your orders, and enjoy a personalized shopping experience.
        </p>

        <v-btn
          color="primary"
          block
          size="large"
          prepend-icon="mdi-google"
          :loading="loading"
          @click="loginWithGoogle"
        >
          {{ $t('auth.loginWithGoogle') }}
        </v-btn>

        <v-alert v-if="error" type="error" class="mt-4">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginView',

  data() {
    return {
      loading: false,
      error: null
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      authError: 'auth/error'
    })
  },

  methods: {
    ...mapActions({
      googleLogin: 'auth/loginWithGoogle'
    }),

    redirectAfterLogin() {
      const redirectPath = this.$route.query.redirect || '/';
      this.$router.push(redirectPath);
    },

    async loginWithGoogle() {
      this.loading = true;
      this.error = null;

      try {
        await this.googleLogin();
        this.redirectAfterLogin();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/');
      return;
    }

    if (this.authError) {
      this.error = this.authError;
    }
  }
};
</script>