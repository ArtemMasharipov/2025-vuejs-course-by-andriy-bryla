<template>
    <div class="security-code">
        <label>Security Code (CVV)</label>
        <input v-model="inputValue" type="password" placeholder="xxx" maxlength="3" @keydown="handleKeydown" />
    </div>
</template>

<script>
export default {
    name: 'SecurityCodeInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        modelModifiers: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['update:modelValue'],
    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                if (this.modelModifiers.digitsOnly) {
                    value = value.replace(/\D/g, '')
                }
                this.$emit('update:modelValue', value.slice(0, 3))
            },
        },
    },
    methods: {
        handleKeydown(event) {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
            if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
                event.preventDefault()
            }
        },
    },
}
</script>

<style scoped>
.security-code {
    margin-bottom: 0;
}

.security-code label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.security-code input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.security-code input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
