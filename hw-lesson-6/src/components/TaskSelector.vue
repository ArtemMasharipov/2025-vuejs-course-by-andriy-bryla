<template>
    <div class="task-selector">
        <h1 class="main-title">ДЗ. Урок №6. v-model для компонентів. scss, images, firebase</h1>
        <div class="tabs-container">
            <div class="tabs">
                <div
                    v-for="(task, index) in tasks"
                    :key="task.name"
                    class="tab"
                    :class="{ active: currentTask === task.component }"
                    @click="selectTask(task)"
                >
                    Task {{ index + 1 }}
                </div>
            </div>
            <div class="content-panel">
                <component :is="currentTask" v-if="currentTask" />
                <div v-else class="empty-state">Please select a task to begin</div>
            </div>
        </div>
    </div>
</template>

<script>
import Task1 from './tasks/task_1/index.vue'
import Task2 from './tasks/task_2/index.vue'
import Task3 from './tasks/task_3/index.vue'
import Task4 from './tasks/task_4/index.vue'
import Task5 from './tasks/task_5/index.vue'
import Task6 from './tasks/task_6/index.vue'

export default {
    components: {
        Task1,
        Task2,
        Task3,
        Task4,
        Task5,
    },
    data() {
        return {
            tasks: [
                { name: 'Age Input Task', component: Task1 },
                { name: 'JS Path Validator', component: Task2 },
                { name: 'EDU Email Input', component: Task3 },
                { name: 'User Form Task', component: Task4 },
                { name: 'Products Manager Task', component: Task5 },
                { name: 'Credit Cart Task', component: Task6 },
            ],
            currentTask: null,
        }
    },
    methods: {
        selectTask(task) {
            this.currentTask = task.component
        },
    },
}
</script>

<style scoped>
.main-title {
    color: #1a365d;
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    padding: 15px;
    background: linear-gradient(to right, #f8f9fa, #e9ecef, #f8f9fa);
    border-radius: 8px;
    animation: fadeIn 0.6s ease-in-out;
}

.task-selector {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;
}

.tabs-container {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.tabs {
    display: flex;
    gap: 4px;
    background: #f8fafc;
    padding: 15px;
    border-bottom: 2px solid #e2e8f0;
}

.tab {
    padding: 12px 24px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;
    color: #64748b;
    min-width: 120px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e2e8f0;
}

.tab:hover {
    background: #f1f5f9;
    color: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tab.active {
    background: #92aad1;
    color: white;
    border-color: #5c677f;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.content-panel {
    padding: 30px;
    min-height: 300px;
    background: linear-gradient(145deg, #ffffff, #f8fafc);
}

.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: #94a3b8;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    background: linear-gradient(145deg, #f8fafc, #f1f5f9);
    border-radius: 8px;
    border: 2px dashed #e2e8f0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .tabs {
        flex-wrap: wrap;
        justify-content: center;
    }

    .tab {
        min-width: calc(50% - 4px);
    }

    .main-title {
        font-size: 1.5rem;
    }

    .title {
        font-size: 1.8rem;
    }
}

@media (max-width: 480px) {
    .tab {
        min-width: 100%;
    }
}
</style>
