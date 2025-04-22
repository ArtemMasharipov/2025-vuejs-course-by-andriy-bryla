<template>
  <v-container class="about-view">
    <h1 class="text-h3 mb-6">{{ $t('about.title') }}</h1>

    <v-card class="mb-6 pa-6">
      <v-card-text>
        <p class="text-body-1 mb-4">{{ $t('about.description') }}</p>

        <h2 class="text-h5 mb-3">{{ $t('about.technologies.title') }}</h2>
        <v-list>
          <v-list-item v-for="(tech, index) in technologies" :key="index">
            <template v-slot:prepend>
              <v-icon :color="tech.color">{{ tech.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ tech.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ tech.description }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="pa-6">
      <v-card-title>{{ $t('about.demo.title') }}</v-card-title>
      <v-card-text>
        <p class="text-body-1">{{ $t('about.demo.description') }}</p>

        <div class="d-flex justify-center mt-6">
          <v-btn
            color="primary"
            size="large"
            :to="{ name: 'products' }"
          >
            {{ $t('about.demo.exploreProducts') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AboutView',

  data() {
    return {
      technologies: [
        {
          name: 'Vue.js 3',
          icon: 'fab fa-vuejs',
          color: 'green',
          description: this.$t('about.technologies.vue')
        },
        {
          name: 'Vuex 4',
          icon: 'fas fa-database',
          color: 'green-darken-2',
          description: this.$t('about.technologies.vuex')
        },
        {
          name: 'Vue Router 4',
          icon: 'fas fa-route',
          color: 'blue',
          description: this.$t('about.technologies.router')
        },
        {
          name: 'Vuetify 3',
          icon: 'fas fa-palette',
          color: 'blue-darken-3',
          description: this.$t('about.technologies.vuetify')
        },
        {
          name: 'Firebase',
          icon: 'fas fa-fire',
          color: 'orange',
          description: this.$t('about.technologies.firebase')
        },
        {
          name: 'Vue I18n',
          icon: 'fas fa-language',
          color: 'purple',
          description: this.$t('about.technologies.i18n')
        }
      ]
    };
  }
};
</script>

<style scoped>
.about-view {
  padding-top: 20px;
  padding-bottom: 40px;
}
</style>
