<template>
  <nav class="navbar">
    <div class="nav-items">
      <button 
        :class="{ active: currentView === VIEWS.FORM }" 
        @click="$emit('change-view', VIEWS.FORM)"
      >
        Book Room
      </button>
      <button 
        :class="{ active: currentView === VIEWS.LIST }" 
        @click="$emit('change-view', VIEWS.LIST)"
      >
        Bookings List
      </button>
      <button 
        :class="{ active: currentView === VIEWS.ABOUT }" 
        @click="$emit('change-view', VIEWS.ABOUT)"
      >
        About
      </button>
    </div>
  </nav>
</template>

<script>
import { VIEWS } from '@/constants';

export default {
  name: 'AppNavbar',
  props: {
    currentView: {
      type: String,
      required: true
    }
  },
  emits: ['change-view'],
  computed: {
    VIEWS() {
      return VIEWS;
    }
  }
};
</script>

<style scoped>
.navbar {
  background: #42b983;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.nav-items {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background: rgba(255, 255, 255, 0.1);
}

button.active {
  background: white;
  color: #42b983;
}
</style>
