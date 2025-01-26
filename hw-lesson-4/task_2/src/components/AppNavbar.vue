<template>
    <nav class="navbar">
        <div class="nav-brand">Vue Chat App</div>
        <div class="nav-links">
            <button 
                class="nav-btn" 
                :class="{ active: currentView === VIEWS.CHAT }"
                @click="$emit('change-view', VIEWS.CHAT)"
            >
                Chat
            </button>
            <button 
                class="nav-btn"
                :class="{ active: currentView === VIEWS.TASK }"
                @click="$emit('change-view', VIEWS.TASK)"
            >
                Task Info
            </button>
        </div>
    </nav>
</template>

<script>
import { VIEWS } from '../constants'

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
            VIEWS
        }
    }
}
</script>

<style scoped>
.navbar {
    background: #42b983;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    gap: 1rem;
}

.nav-btn {
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
    background: white;
    color: #42b983;
}
</style>
