<template>
  <div class="language-switcher">
    <v-btn-toggle
      v-model="language"
      color="accent"
      mandatory
      density="compact"
    >
      <v-btn value="uk">UA</v-btn>
      <v-btn value="en">EN</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LanguageSwitcher',
  
  computed: {
    ...mapGetters('localization', ['currentLocale']),
    
    language: {
      get() {
        return this.currentLocale;
      },
      set(value) {
        this.changeLocale(value);
      }
    }
  },
  
  methods: {
    ...mapActions('localization', ['changeLocale'])
  }
};
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}
</style>