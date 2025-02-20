<template>
    <div class="container">
        <header class="lesson-header">
            <h1>ДЗ. Урок №8. Практика. Vuex</h1>
        </header>
        <div class="task-selector">
            <div class="task-tabs">
                <button v-for="task in tasks" :key="task.id"
                    :class="['tab-button', { active: currentTask === task.id }]" @click="currentTask = task.id">
                    {{ task.name }}
                </button>
            </div>
            <component :is="currentComponent" class="task-content" />
        </div>
    </div>
</template>

<script>
import ProductManager from './task_1/ProductManager.vue';
import CarsShopManager from './task_2/CarsShopManager.vue';

export default {
    name: 'TaskSelector',
    data() {
        return {
            currentTask: 1,
            tasks: [
                { id: 1, name: 'Task 1: Product Catalog', component: ProductManager },
                { id: 2, name: 'Task 2: Cars Shop', component: CarsShopManager },
            ]
        }
    },
    computed: {
        currentComponent() {
            const task = this.tasks.find(t => t.id === this.currentTask)
            return task ? task.component : null
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.lesson-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
    border-radius: 8px;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lesson-header h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
}

.task-selector {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.task-tabs {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.tab-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background: #f0f0f0;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.tab-button.active {
    background: #42b883;
    color: white;
}

.task-content {
    width: 100%;
}
</style>
