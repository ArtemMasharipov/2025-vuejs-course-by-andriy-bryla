<template>
    <div class="task-container">
        <h3 class="task-title">
            <b>Задача 2.</b> Розробити компонент (з підтримкою v-model), який дозволяє вводити шлях до файлу js (URL, що
            закінчується розширенням js). При заданні модифікатора checkPath відображати червоним фоном input, якщо шлях
            некоректний.
        </h3>

        <js-path-input v-model.checkPath="jsPathValue" title="Введіть шлях до файлу:" />
    </div>
</template>

<script>
import JsPathInput from './JsPathInput.vue'

export default {
    name: 'TaskTwo',
    components: {
        JsPathInput,
    },
    data() {
        return {
            jsPathValue: '',
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
