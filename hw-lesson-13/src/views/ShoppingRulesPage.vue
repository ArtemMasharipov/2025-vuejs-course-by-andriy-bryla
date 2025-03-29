<template>
  <div class="shopping-rules">
    <page-title title="Правила купівлі" />
    
    <base-card class="rules-section">
      <ul>
        <li>Купуємо багато</li>
        <li>Платимо швидко</li>
        <li>Насолоджуємось товаром</li>
      </ul>
    </base-card>
    
    <image-gallery />
    
    <div class="back-button">
      <router-link :to="{ name: 'Home' }">
        <base-button>На головну</base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import PageTitle from '@/components/base/PageTitle.vue';
import ImageGallery from '@/components/ImageGallery.vue';

export default {
  name: 'ShoppingRulesPage',
  components: {
    BaseButton,
    BaseCard,
    ImageGallery,
    PageTitle
  }
}
</script>

<style scoped>
.shopping-rules {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.rules-section {
  margin-bottom: 30px;
}

.rules-section ul {
  font-size: 18px;
  line-height: 1.8;
  padding-left: 30px;
}

.rules-section li {
  margin-bottom: 15px;
}

.back-button {
  text-align: center;
  margin-top: 30px;
}
</style>
