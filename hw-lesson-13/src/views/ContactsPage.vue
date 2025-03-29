<template>
  <div class="contacts-page">
    <page-title title="Наші контакти" />
    
    <base-card class="contact-info">
      <p><strong>Адреса магазину:</strong> біля будинку Баби Галі</p>
      <p><strong>Менеджер:</strong> Дід Петро</p>
      <p><strong>Заступник:</strong> онука Софійка</p>
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
import ImageGallery from '@/components/ImageGallery.vue';
import PageTitle from '@/components/base/PageTitle.vue';

export default {
  name: 'ContactsPage',
  components: {
    BaseButton,
    BaseCard,
    ImageGallery,
    PageTitle
  }
}
</script>

<style scoped>
.contacts-page {
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  text-align: center;
  margin-top: 30px;
}
</style>
