<template>
    <div class="card-input">
        <label>Card Number</label>
        <input
            v-model="inputValue"
            type="text"
            placeholder="xxxx xxxx xxxx xxxx"
            maxlength="19"
            @keydown="handleKeydown"
        />
    </div>
</template>

<script>
export default {
    name: 'CardNumberInput',
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
                if (this.modelModifiers.separate4Digits && this.modelValue) {
                    return this.modelValue.replace(/(.{4})/g, '$1 ').trim()
                }
                return this.modelValue
            },
            set(value) {
                value = value.replace(/\s/g, '')
                if (this.modelModifiers.digitsOnly) {
                    value = value.replace(/\D/g, '')
                }
                this.$emit('update:modelValue', value)
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
.card-input {
    margin-bottom: 15px;
}

.card-input label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.card-input input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.card-input input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
