<template>
    <div class="input-wrapper">
        <label>
            <input
                v-model="inputValue"
                :class="{ 'invalid-path-bg': shouldShowError }"
                type="text"
                placeholder="Enter URL path"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'JsPathInput',
    props: {
        modelValue: { type: String, default: '' },
        modelModifiers: { type: Object, default: () => ({}) },
    },
    emits: ['update:modelValue'],
    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            },
        },
        isValidPath() {
            return this.modelValue && /^(?:\S+\/)*\S+\w+\.js$/.test(this.modelValue)
        },
        shouldShowError() {
            return this.modelModifiers.checkPath && this.modelValue !== '' && !this.isValidPath
        },
    },
}
</script>

<style scoped>
.input-wrapper {
    max-width: 400px;
}

input {
    padding: 12px;
    font-size: 16px;
    border: 2px solid #e5e7eb;
    border-radius: var(--border-radius);
    width: 100%;
    transition: var(--transition);
}

.invalid-path-bg {
    background-color: red;
}
</style>
