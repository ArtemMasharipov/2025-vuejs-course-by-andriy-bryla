<template>
    <div class="d-flex justify-center align-center" :class="wrapperClasses" :style="{ minHeight: minHeight }">
        <v-progress-circular indeterminate :color="color" :size="size"></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
    props: {
        color: {
            type: String,
            default: 'primary',
        },
        size: {
            type: [Number, String],
            default: 50,
        },
        minHeight: {
            type: String,
            default: '200px',
        },
        wrapperClasses: {
            type: [String, Array, Object],
            default: '',
        },
    },
}
</script>

<style scoped></style>
