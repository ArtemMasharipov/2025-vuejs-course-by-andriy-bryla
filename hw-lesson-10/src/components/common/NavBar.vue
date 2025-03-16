<template>
  <nav class="main-nav">
    <div class="nav-container">
      <router-link :to="{ name: 'home' }" class="brand">Bus Management System</router-link>
      
      <ul>
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link :to="{ name: 'drivers' }">Drivers</router-link></li>
        <li><router-link :to="{ name: 'buses' }">Buses</router-link></li>
        <li><router-link :to="{ name: 'assignments' }">Assignments</router-link></li>
        <li><router-link :to="{ name: 'contacts' }">Contact Us</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.main-nav {
  background-color: #0066cc;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 4rem; 
  display: flex;
  align-items: center;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.brand {
  font-weight: bold;
  color: white;
  margin-right: 2rem;
  white-space: nowrap;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem; 
}

.main-nav a {
  color: white;
  padding: 0.25rem 0.75rem;
  display: block;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.main-nav a:hover,
.main-nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .main-nav {
    height: auto;
    min-height: 3rem;
  }

  .nav-container {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 1rem;
  }
  
  .main-nav ul {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
  
  .main-nav li {
    width: 100%;
  }
  
  .main-nav a {
    width: 100%;
    padding: 0.75rem 1rem;
  }
  
  .brand {
    margin: 0;
    padding: 0.5rem 0;
  }
}
</style>
