<template>
    <div class="chat-box">
        <div class="chat-container">
            <app-navbar :current-view="currentView" @change-view="currentView = $event" />

            <keep-alive>
                <component :is="currentView" v-if="currentView === VIEWS.TASK"></component>
                <div v-else>
                    <div class="chat-header">
                        <div class="header-content">
                            <h2>Messages</h2>
                            <select v-model="currentUser" class="user-select">
                                <option v-for="user in USERS" :key="user.id" :value="user.id">
                                    {{ user.name }}
                                </option>
                            </select>
                        </div>
                        <button v-if="messages.length" class="clear-btn" @click="confirmClearChat">Clear Chat</button>
                    </div>
                    <div ref="messagesContainer" class="messages-container">
                        <div v-if="!messages.length" class="empty-state">
                            <p>No messages yet. Start the conversation! 💬</p>
                        </div>
                        <message-list 
                            v-else 
                            :messages="messages" 
                            @reaction="handleReaction"
                        />
                    </div>
                    <message-input @add-message="addMessage" />
                </div>
            </keep-alive>

            <!-- Confirmation Modal -->
            <div v-if="showConfirmation" class="modal-overlay">
                <div class="modal-content">
                    <h3>Clear Chat?</h3>
                    <p>Are you sure you want to delete all messages? This action cannot be undone.</p>
                    <div class="modal-actions">
                        <button class="cancel-btn" @click="showConfirmation = false">Cancel</button>
                        <button class="delete-btn" @click="clearChat">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavbar from './AppNavbar.vue'
import MessageInput from './MessageInput.vue'
import MessageList from './MessageList.vue'
import TaskDescription from './TaskDescription.vue'
import { STORAGE_KEY, USERS, VIEWS } from '../constants'

export default {
    components: {
        AppNavbar,
        MessageInput,
        MessageList,
        TaskDescription,
        'task-description': TaskDescription,
    },
    data() {
        return {
            messages: [],
            showConfirmation: false,
            currentUser: USERS[0].id,
            currentView: VIEWS.CHAT,
            VIEWS,
            USERS,
        }
    },

    created() {
        this.loadMessages()
    },
    methods: {
        loadMessages() {
            const savedMessages = localStorage.getItem(STORAGE_KEY)
            if (savedMessages) {
                this.messages = JSON.parse(savedMessages)
            }
        },
        saveMessages() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.messages))
        },
        addMessage(text) {
            this.messages.push({
                id: Date.now(),
                text,
                likes: 0,
                dislikes: 0,
                timestamp: new Date().toISOString(),
                userId: this.currentUser,
            })
            this.saveMessages()
            this.$nextTick(() => {
                this.scrollToBottom()
            })
        },
        handleReaction({ messageId, type }) {
            const message = this.messages.find(msg => msg.id === messageId)
            if (message) {
                message[type]++
                this.saveMessages()
            }
        },
        confirmClearChat() {
            this.showConfirmation = true
        },
        clearChat() {
            this.messages = []
            this.saveMessages()
            this.showConfirmation = false
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer
            container.scrollTop = container.scrollHeight
        },
    },
}
</script>

<style scoped>
.chat-box {
    max-width: 800px;
    margin: 2rem auto;
}

.chat-container {
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1rem;
}

.clear-btn {
    padding: 0.5rem 1rem;
    background-color: #ff4757;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.clear-btn:hover {
    background-color: #ff6b81;
}

.messages-container {
    height: 400px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 4px;
}

.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #666;
    font-style: italic;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    text-align: center;
}

.modal-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}

.cancel-btn,
.delete-btn {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.cancel-btn {
    background-color: #e9ecef;
    color: #495057;
}

.delete-btn {
    background-color: #ff4757;
    color: white;
}

.cancel-btn:hover {
    background-color: #dee2e6;
}

.delete-btn:hover {
    background-color: #ff6b81;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
}

:deep(.navbar) {
    margin-bottom: 0;
    border-radius: 8px 8px 0 0;
}
</style>
