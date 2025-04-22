<template>
  <div class="home">
    <v-parallax
      src="https://cdn.pixabay.com/photo/2016/03/02/20/13/shopping-1232944_1280.jpg"
      height="400"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h2 font-weight-bold mb-4">{{ $t('home.welcome') }}</h1>
        <h2 class="text-h5 mb-6">{{ $t('home.subtitle') }}</h2>
        <v-btn
          color="primary"
          size="large"
          :to="{ name: 'products' }"
          class="px-8"
        >
          {{ $t('home.shopNow') }}
        </v-btn>
      </div>
    </v-parallax>

    <v-container class="py-12">
      <h2 class="text-h4 text-center mb-6">{{ $t('home.features.title') }}</h2>

      <v-row>
        <v-col cols="12" md="4">
          <v-card height="100%">
            <v-card-title class="d-flex align-center">
              <v-icon color="primary" size="large" class="me-3">fas fa-shopping-cart</v-icon>
              {{ $t('home.features.cart.title') }}
            </v-card-title>
            <v-card-text>{{ $t('home.features.cart.desc') }}</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card height="100%">
            <v-card-title class="d-flex align-center">
              <v-icon color="primary" size="large" class="me-3">fas fa-globe</v-icon>
              {{ $t('home.features.i18n.title') }}
            </v-card-title>
            <v-card-text>{{ $t('home.features.i18n.desc') }}</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card height="100%">
            <v-card-title class="d-flex align-center">
              <v-icon color="primary" size="large" class="me-3">fas fa-user-shield</v-icon>
              {{ $t('home.features.auth.title') }}
            </v-card-title>
            <v-card-text>{{ $t('home.features.auth.desc') }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>

<style scoped>
.home {
  margin-bottom: 40px;
}
</style>
