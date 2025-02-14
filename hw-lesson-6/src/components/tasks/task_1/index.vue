<template>
    <div class="task-container">
        <h3 class="task-title">
            <b>Задача 1.</b> Розробити компонент для введення віку користувача (з підтримкою v-model). При заданні
            модифікатора check не допускати введення некоректного віку (вік не може бути більшим за 150). При заданні
            модифікатора setColor задавати фон (вік менше 10 – зелений, від 10 до 21 – жовтий, інакше – оранжевий).
        </h3>
        <div>
            <age-input-component v-model.number.check.setColor="localAge" />
        </div>
    </div>
</template>

<script>
import AgeInputComponent from './AgeInputComponent.vue'

export default {
    name: 'TaskOne',
    components: {
        AgeInputComponent,
    },
    data() {
        return {
            localAge: null,
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
