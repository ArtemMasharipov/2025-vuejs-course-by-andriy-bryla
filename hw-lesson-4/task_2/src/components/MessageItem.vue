<template>
    <div class="message-item" :class="messageClass">
        <div class="message-header">
            <span class="message-user" :style="{ color: userColor }">
                {{ userName }}
            </span>
            <span class="message-time">{{ formattedTime }}</span>
        </div>
        <div class="message-content">
            <p class="message-text">{{ message.text }}</p>
        </div>
        <div class="message-actions">
            <button 
                v-for="(reaction, type) in reactions" 
                :key="type"
                class="action-btn"
                :class="[type, { active: message[type] > 0 }]"
                @click="handleReaction(type)"
            >
                {{ reaction.icon }} {{ message[type] }}
            </button>
        </div>
    </div>
</template>

<script>
import { USERS } from '../constants'

export default {
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    emits: ['reaction'],
    data() {
        return {
            reactions: {
                likes: { icon: '👍' },
                dislikes: { icon: '👎' }
            }
        }
    },
    computed: {
        formattedTime() {
            if (!this.message.timestamp) return '';
            return new Date(this.message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        messageClass() {
            return `message-${this.message.userId}`
        },
        userName() {
            const user = USERS.find(user => user.id === this.message.userId)
            return user ? user.name : 'Unknown User'
        },
        userColor() {
            const user = USERS.find(user => user.id === this.message.userId)
            return user ? user.color : '#999'
        }
    },
    methods: {
        handleReaction(type) {
            this.$emit('reaction', {
                messageId: this.message.id,
                type
            })
        }
    }
}
</script>

<style scoped>
.message-item {
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #eee;
    transition: all 0.3s ease;
    max-width: 80%;
}

.message-item:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-text {
    margin: 0 0 0.5rem 0;
    word-break: break-word;
}

.message-actions {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    padding: 0.3rem 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-btn:hover {
    background: #f5f5f5;
}

.action-btn.active {
    background: #e8f5e9;
    border-color: #42b983;
}

.dislike.active {
    background: #ffebee;
    border-color: #ef5350;
}

.message-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.message-time {
    font-size: 0.8rem;
    color: #666;
    white-space: nowrap;
}

.message-user1, .message-user-1 {
    margin-right: 20%;
    background: #fff;
    border-radius: 12px 12px 12px 0;
}

.message-user2, .message-user-2 {
    margin-left: 20%;
    background: #e3f2fd;
    border-radius: 12px 12px 0 12px;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.message-user {
    font-weight: 600;
    font-size: 0.9rem;
    color: #2c3e50;
}

.likes.active {
    background: #e8f5e9;
    border-color: #42b983;
}

.dislikes.active {
    background: #ffebee;
    border-color: #ef5350;
}
</style>
