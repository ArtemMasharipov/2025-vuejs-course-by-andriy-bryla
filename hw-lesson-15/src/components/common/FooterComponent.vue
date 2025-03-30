<template>
  <v-footer app class="footer-container">
    <div class="footer-content">
      &copy; {{ currentYear }} Bus Management System. All rights reserved.
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer-container {
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 1;
}

.footer-content {
  width: 100%;
  text-align: center;
  padding: 12px 0;
}
</style>
