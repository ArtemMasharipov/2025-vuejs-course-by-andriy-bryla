<template>
  <div class="contacts">
    <h1>Контакти</h1>
    
    <div class="contact-container">
      <div class="contact-info">
        <h2>Нас дуже легко знайти:</h2>
        
        <div class="info-item">
          <h3>1. Потягом до Ужгорода</h3>
        </div>
        
        <div class="info-item">
          <h3>2. Шукайте бабу Галю (вона дорогу покаже)</h3>
        </div>
        
        <div class="info-message">
          <h3>До зустрічі!!!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contacts-view'
}
</script>

<style scoped>
.contacts {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.contact-container {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.contact-info {
  text-align: center;
}

.contact-info h2 {
  margin-bottom: 25px;
  color: #333;
}

.info-item {
  margin-bottom: 20px;
}

.info-item h3 {
  color: #555;
  font-weight: normal;
}

.info-message {
  margin-top: 40px;
}

.info-message h3 {
  font-weight: bold;
  font-size: 24px;
}
</style>
