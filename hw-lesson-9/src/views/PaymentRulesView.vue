<template>
  <div class="payment-rules">
    <h1>Правила оплати</h1>
    
    <div class="rules-section">
      <ul>
        <li>При отриманні</li>
        <li>Переказ на картку</li>
        <li>Записати у зошит</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payment-rules-view'
}
</script>

<style scoped>
.payment-rules {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.rules-section {
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

p {
  margin-bottom: 15px;
  line-height: 1.6;
}
</style>
