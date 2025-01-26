<template>
    <nav class="navbar section card">
        <div class="nav-brand">
            <span class="brand-emoji">🛍️</span>
            <h1 class="brand-title">Vue Shop</h1>
        </div>
        <div class="nav-items">
            <button 
                v-for="item in navItems" 
                :key="item.component"
                class="btn nav-btn"
                :class="{ 
                    'nav-btn-active': currentView === item.component,
                    'btn-primary': currentView === item.component,
                    'btn-secondary': currentView !== item.component
                }"
                @click="$emit('change-view', item.component)"
            >
                <span class="nav-icon">{{ item.icon }}</span>
                {{ item.label }}
                <span v-if="item.badge" class="badge">{{ item.badge }}</span>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppNavbar',
    props: {
        currentView: {
            type: String,
            required: true
        }
    },
    emits: ['change-view'],
    data() {
        return {
            navItems: [
                { 
                    component: 'ProductManager', 
                    label: 'Каталог',
                    icon: '🏪'
                },
                { 
                    component: 'TaskDescription', 
                    label: 'Опис завдання',
                    icon: '📋'
                }
            ]
        }
    }
}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
    margin-bottom: calc(var(--spacing-unit) * 3);
    background: white;
    border-bottom: 2px solid var(--primary-color);
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: var(--spacing-unit);
}

.brand-emoji {
    font-size: 1.8em;
}

.brand-title {
    font-size: 1.5em;
    color: var(--secondary-color);
    margin: 0;
    font-weight: 600;
}

.nav-items {
    display: flex;
    gap: calc(var(--spacing-unit) * 2);
}

.nav-btn {
    position: relative;
    min-width: 120px;
    padding: calc(var(--spacing-unit) * 1.2) calc(var(--spacing-unit) * 2);
    font-size: 1em;
}

.nav-btn-active {
    font-weight: 600;
}

.nav-icon {
    margin-right: var(--spacing-unit);
    font-size: 1.2em;
}

.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--danger-color);
    color: white;
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 0.8em;
    font-weight: 600;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: calc(var(--spacing-unit) * 2);
        padding: var(--spacing-unit);
    }

    .nav-items {
        width: 100%;
        flex-direction: column;
    }

    .nav-btn {
        width: 100%;
        justify-content: flex-start;
    }
}

/* Добавляем анимации */
.nav-btn {
    transition: all 0.3s ease;
}

.nav-btn:hover {
    transform: translateY(-2px);
}

.nav-btn-active {
    transform: scale(1.05);
}

/* Добавляем эффект при нажатии */
.nav-btn:active {
    transform: scale(0.95);
}
</style>
