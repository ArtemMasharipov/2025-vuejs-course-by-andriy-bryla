<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <master-page-layout>
          <RouterView />
        </master-page-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
