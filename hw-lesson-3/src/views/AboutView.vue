<template>
  <div class="about-view">
    <div class="task-description">
      <h2>Урок №3. Практика</h2>
      <div class="task-content">
        <h3>Задача 14</h3>
        <p>Розробити форму для бронювання номера у готелі (придумайте самі які мають бути поля):</p>
        <ul>
          <li>Особиста інформація (ім'я, email)</li>
          <li>Дати бронювання (заїзд, виїзд)</li>
          <li>Параметри номера (тип, кількість гостей)</li>
          <li>Зберігання даних в localStorage</li>
          <li>Управління бронюваннями (перегляд, видалення)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
};
</script>

<style scoped>
.about-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-description {
  background: #f8f9fa;
  border-left: 4px solid #42b983;
  padding: 20px;
  border-radius: 0 8px 8px 0;
}

.task-content {
  padding-left: 15px;
}

.task-content h3 {
  color: #42b983;
  margin: 0 0 10px 0;
}

.task-content ul {
  list-style-type: none;
  padding: 0;
}

.task-content li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  line-height: 1.4;
}

.task-content li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #42b983;
}

.about-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.version {
  margin-top: 20px;
  color: #666;
  font-size: 0.9em;
  text-align: right;
}
</style>
