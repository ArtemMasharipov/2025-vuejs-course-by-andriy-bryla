<template>
    <div class="expiry-date">
        <label for="expiry-date">EXPIRY DATE</label>
        <input
            id="expiry-date"
            v-model="formattedValue"
            type="text"
            maxlength="5"
            placeholder="MM/YY"
            @keydown="handleKeydown"
        />
    </div>
</template>

<script>
export default {
    name: 'ExpiryDateInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    computed: {
        formattedValue: {
            get() {
                const val = this.modelValue || ''
                return val.length > 2 ? val.slice(0, 2) + '/' + val.slice(2) : val
            },
            set(value) {
                let digits = value.replace(/\D/g, '')
                if (digits.length > 4) digits = digits.slice(0, 4)
                this.$emit('update:modelValue', digits)
            },
        },
    },
    methods: {
        handleKeydown(e) {
            const isAllowedKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
            if (!isAllowedKey && !/\d/.test(e.key)) {
                e.preventDefault()
            }
        },
    },
}
</script>

<style scoped>
.expiry-date {
    margin-bottom: 0;
}

.expiry-date label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.expiry-date input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.expiry-date input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
