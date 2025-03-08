<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to Our Electronics Shop</h1>
      <p>Discover the latest tech products at competitive prices</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-view',
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.hero p {
  color: #666;
  font-size: 1.2em;
  margin-bottom: 30px;
}

.shop-now-btn {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 12px 30px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.shop-now-btn:hover {
  background-color: #45a049;
}
</style>
