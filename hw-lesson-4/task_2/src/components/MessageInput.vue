<template>
    <div class="message-input">
        <input 
            v-model.trim="newMessage"
            type="text" 
            class="input-field"
            placeholder="Type a new message" 
            @keyup.enter="sendMessage"
        />
        <button 
            class="send-btn"
            :disabled="!newMessage"
            @click="sendMessage"
        >
            Send
        </button>
    </div>
</template>

<script>
export default {
    emits: ['add-message'],
    data() {
        return { 
            newMessage: "" 
        }
    },
    methods: {
        sendMessage() {
            if (this.newMessage) {
                this.$emit("add-message", this.newMessage);
                this.newMessage = "";
            }
        },
    },
};
</script>

<style scoped>
.message-input {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    background: white;
    border-radius: 4px;
}

.input-field {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.send-btn {
    padding: 0.5rem 1rem;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.send-btn:hover {
    background: #3aa876;
}

.send-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>
