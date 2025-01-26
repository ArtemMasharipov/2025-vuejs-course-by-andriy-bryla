<template>
    <div id="app">
        <app-navbar 
            :current-view="currentView"
            @change-view="currentView = $event"
        />
        <component 
            :is="currentView"
            :products="allProducts"
            @product-bought="showNotification"
        />
    </div>
</template>

<script>
import { products } from './composables/useProducts'
import ProductManager from './components/ProductManager.vue'
import TaskDescription from './components/TaskDescription.vue'
import AppNavbar from './components/AppNavbar.vue'
import './assets/styles/common.css'

export default {
    name: 'App',
    components: {
        ProductManager,
        TaskDescription,
        AppNavbar
    },
    data() {
        return {
            currentView: 'ProductManager',
            allProducts: products
        }
    },
    methods: {
        showNotification({ message }) {
            const notification = document.createElement('div')
            notification.className = 'notification'
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">🛒</span>
                    ${message}
                </div>
            `
            
            document.body.appendChild(notification)
            
            setTimeout(() => {
                notification.classList.add('notification-hide')
                setTimeout(() => notification.remove(), 300)
            }, 3000)
        }
    }
}
</script>

<style>
#app {
    font-family: 'Roboto', Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit) * 2.5);
    background-color: var(--background-color);
    min-height: 100vh;
}

.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 16px 24px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-icon {
    font-size: 1.2em;
}

.notification-hide {
    animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>
