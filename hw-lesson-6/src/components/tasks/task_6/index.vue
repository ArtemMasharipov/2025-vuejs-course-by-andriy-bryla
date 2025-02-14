<template>
    <div class="task-container">
        <h3 class="task-title">
            <b>Задача 6.</b> Створити компонент - форму для вводу даних кредитної карти (на зразок поданого прикладу).
            При вводі "EXPIRY DATE" розділювач "/" додається автоматично.
        </h3>

        <credit-card-input
            v-model:card-number.separate4Digits.digitsOnly="formData.cardNumber"
            v-model:card-vv.digitsOnly="formData.secureCode"
        />
    </div>
</template>

<script>
import CreditCardInput from './CreditCardInput.vue'

export default {
    name: 'TaskSix',
    components: {
        CreditCardInput,
    },
    data() {
        return {
            formData: {
                cardNumber: '',
                secureCode: '',
            },
        }
    },
}
</script>

<style scoped>
.task-container {
    padding: 20px;
}

.task-title {
    margin-bottom: 20px;
    line-height: 1.5;
}
</style>
