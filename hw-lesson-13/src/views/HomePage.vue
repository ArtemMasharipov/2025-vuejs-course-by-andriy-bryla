<template>
  <div class="home-page">
    <page-title title="Вітаємо! Сподіваємось, Ви будуте чемними і обов'язково щось купите!" />

    <section class="welcome-section">
      <div class="welcome-image">
        <div class="placeholder-image">
          <span>🏪</span>
        </div>
      </div>
      <div class="welcome-text">
        <h2>Про нас</h2>
        <p>Ми пропонуємо широкий асортимент якісних товарів за доступними цінами. У нашому магазині ви знайдете
          все необхідне для дому, роботи та відпочинку.</p>
        <p>Наші переваги:</p>
        <ul>
          <li>Висока якість продукції</li>
          <li>Швидка доставка</li>
          <li>Професійні консультанти</li>
          <li>Гнучка система знижок</li>
        </ul>
        <router-link to="/products" class="view-products-btn">
          Переглянути продукти
        </router-link>
      </div>
    </section>

    <section class="news-section">
      <h2>Новини та акції</h2>
      <div class="news-grid">
        <base-card v-for="(news, index) in newsItems" :key="index" class="news-item">
          <h3>{{ news.title }}</h3>
          <p>{{ news.content }}</p>
        </base-card>
      </div>
    </section>
  </div>
</template>

<script>
import BaseCard from '@/components/base/BaseCard.vue';
import PageTitle from '@/components/base/PageTitle.vue';

export default {
  name: 'HomePage',
  components: {
    BaseCard,
    PageTitle
  },
  data() {
    return {
      newsItems: [
        {
          title: 'Сезонний розпродаж',
          content: 'Знижки до 50% на всі сезонні товари. Пропозиція діє до кінця місяця.'
        },
        {
          title: 'Нове надходження',
          content: 'У нашому асортименті з\'явились нові товари від провідних виробників.'
        },
        {
          title: 'Програма лояльності',
          content: 'Приєднуйтесь до нашої програми лояльності та отримуйте додаткові переваги.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: var(--space-lg) 0;
}

.welcome-section {
  display: flex;
  gap: var(--space-xl);
  margin: var(--space-xl) 0;
  align-items: center;
}

.welcome-image {
  flex: 1;
}

.placeholder-image {
  width: 80%;
  aspect-ratio: 1;
  margin: 0 auto;
  background-color: var(--color-background-lighter);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image span {
  font-size: 8em;
}

.welcome-text {
  flex: 1;
}

.view-products-btn {
  display: inline-block;
  margin-top: var(--space-lg);
  background-color: var(--color-primary);
  color: white;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.view-products-btn:hover {
  background-color: var(--color-primary-dark);
}

.news-section {
  margin: var(--space-xxl) 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-lg);
}

.news-item h3 {
  margin-top: 0;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
  }
  
  .welcome-image, .welcome-text {
    width: 100%;
  }
}
</style>
