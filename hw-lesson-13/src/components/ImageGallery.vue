<template>
  <div class="gallery-container">
    <h3 v-if="title">{{ title }}</h3>
    <div class="gallery">
      <div 
        v-for="(image, index) in galleryEmojis" 
        :key="index" 
        class="gallery-item"
      >
        <div class="image-placeholder">
          {{ image }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    title: {
      type: String,
      default: 'Галерея'
    }
  },
  computed: {
    galleryEmojis() {
      return ['🏪', '🛒', '💰', '📦'];
    }
  }
}
</script>

<style scoped>
.gallery-container {
  margin-top: 30px;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

.gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.gallery-item {
  width: calc(25% - 15px);
  min-width: 150px;
}

.image-placeholder {
  width: 80%;
  height: 120px;
  margin: 0 auto;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  color: #777;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .gallery-item {
    width: calc(50% - 15px);
  }
}
</style>
