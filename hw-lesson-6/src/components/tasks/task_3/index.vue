<template>
    <div class="task-container">
        <h3 class="task-title">
            <b>Задача 3.</b> Розробити компонент (з підтримкою v-model), який дозволяє вводити e-mail (приклад:
            ivan-hopko@inv.mn.edu). Частинка «@inv.mn.edu» додається автоматично (користувач не вводить її). При заданні
            модифікатора check відображати червоним фоном input, якщо некоректний.
        </h3>

        <edu-email-input v-model.trim.check="emailValue" />
    </div>
</template>

<script>
import EduEmailInput from './EduEmailInput.vue'

export default {
    name: 'TaskThree',
    components: {
        EduEmailInput,
    },
    data() {
        return {
            emailValue: '',
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
