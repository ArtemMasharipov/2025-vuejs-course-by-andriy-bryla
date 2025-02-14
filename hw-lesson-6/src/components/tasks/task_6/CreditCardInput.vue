<template>
    <div class="credit-card-form">
        <card-number-input v-model.separate4Digits.digitsOnly="computedCardNumber" />
        <div class="form-row">
            <expiry-date-input v-model="expiryDate" />
            <security-code-input v-model.digitsOnly="computedCardVV" />
        </div>
    </div>
</template>

<script>
import CardNumberInput from './components/CardNumberInput.vue'
import ExpiryDateInput from './components/ExpiryDateInput.vue'
import SecurityCodeInput from './components/SecurityCodeInput.vue'

export default {
    name: 'CreditCardInput',
    components: {
        CardNumberInput,
        ExpiryDateInput,
        SecurityCodeInput,
    },
    props: {
        cardNumber: {
            type: String,
            default: '',
        },
        cardVV: {
            type: String,
            default: '',
        },
    },
    emits: ['update:cardNumber', 'update:cardVV'],
    data() {
        return {
            expiryDate: '',
        }
    },
    computed: {
        computedCardNumber: {
            get() {
                return this.cardNumber
            },
            set(value) {
                this.$emit('update:cardNumber', value)
            },
        },
        computedCardVV: {
            get() {
                return this.cardVV
            },
            set(value) {
                this.$emit('update:cardVV', value)
            },
        },
    },
}
</script>

<style scoped>
.credit-card-form {
    max-width: 400px;
    padding: 20px;
    background: linear-gradient(135deg, #e6e6e6, #f0f0f0);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
</style>
