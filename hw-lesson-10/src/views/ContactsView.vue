<template>
  <div class="contacts">
    <h1>Contact Us</h1>
    <p class="subtitle">Our contact information and working hours</p>
    
    <div class="info-container">
      <div class="info-section">
        <h3>Address</h3>
        <p>123 Transport Street, City, Country</p>
      </div>
      
      <div class="info-section">
        <h3>Phone</h3>
        <p>+1 234 567 8900</p>
      </div>
      
      <div class="info-section">
        <h3>Email</h3>
        <p>info@busmanagement.com</p>
      </div>
      
      <div class="info-section">
        <h3>Working Hours</h3>
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsView'
}
</script>

<style scoped>
.contacts {
  max-width: 800px;
  margin: 0 auto;
}

.contacts h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.subtitle {
  color: #666;
  margin-bottom: 2em;
}

.info-container {
  background: white;
  padding: 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section {
  margin-bottom: 2em;
}

.info-section:last-child {
  margin-bottom: 0;
}

.info-section h3 {
  color: #0066cc;
  margin-bottom: 0.5em;
  font-size: 1.2em;
}

.info-section p {
  margin: 0.2em 0;
  color: #333;
  line-height: 1.4;
}
</style>
