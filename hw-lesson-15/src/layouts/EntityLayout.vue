<template>
  <main-layout :is-loading="isLoading" :has-error="hasError" :error-message="error">
    <slot></slot>
  </main-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EntityLayout',
  props: {
    module: {
      type: String,
      required: true,
      validator: (value) => ['drivers', 'buses', 'assignments'].includes(value)
    }
  },
  computed: {
    ...function() {
      const { module } = this;
      return {
        ...mapGetters(module, {
          isLoading: 'isLoading',
          hasError: 'hasError',
          error: 'getError'
        })
      };
    }
  }
}
</script>
