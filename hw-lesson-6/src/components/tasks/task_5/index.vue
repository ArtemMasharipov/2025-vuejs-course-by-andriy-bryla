<template>
    <div class="task-container">
        <h3 class="task-title">
            <b>Задача 5.</b> Спробуйте відтворити фрагмент. Компонент ProductsFilters через v-model повертає 2 значення
            фільтра: продавець, бренд. При заданні модифікатора "check" відображати секцію зеленою рамкою, якщо фільтр з
            відповідної секції (продавець чи бренд) не обрано.
        </h3>
        <div class="task-content">
            <products-manager :products-data="notebookCardsData" :is-loading="isLoading" />
        </div>
    </div>
</template>

<script>
import ProductsManager from '@/components/tasks/task_5/products/ProductsManager.vue'
import { fetchProducts } from '@/components/tasks/task_5/api/productsApi'

export default {
    name: 'TaskFive',
    components: {
        ProductsManager,
    },
    data() {
        return {
            notebookCardsData: [],
            isLoading: true,
        }
    },
    async created() {
        try {
            this.notebookCardsData = await fetchProducts()
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            this.isLoading = false
        }
    },
}
</script>

<style scoped>
.task-container {
    padding: 20px;
}

.task-title {
    margin-bottom: 20px;
    line-height: 1.5;
}

.task-content {
    margin-top: 20px;
}
</style>
