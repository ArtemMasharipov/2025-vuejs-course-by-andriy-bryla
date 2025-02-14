<template>
    <div class="task-container">
        <h3 class="task-title">
            <b>Задача 4.</b> Розробити компонент для вводу віку користувача та імені. Робити форматування при заданні
            відповідних модифікаторів відповідних полів input: ім'я користувача - у випадку порожнього поля (червони
            фон), вік (вік менший за 18 – колір фону червоний, інакше – зелений).
        </h3>

        <user-form-input
            v-model:name.check="formData.name"
            v-model:age.number.check="formData.age"
            :name-title="'Enter name:'"
            :age-title="'Enter age:'"
        />
    </div>
</template>

<script>
import UserFormInput from './UserFormInput.vue'

export default {
    name: 'TaskFour',
    components: {
        UserFormInput,
    },
    data() {
        return {
            formData: {
                name: '',
                age: null,
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
