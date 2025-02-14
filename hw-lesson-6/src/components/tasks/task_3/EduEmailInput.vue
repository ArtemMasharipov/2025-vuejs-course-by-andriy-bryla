<template>
    <div class="input-wrapper">
        <label>
            <input
                v-model="email"
                type="text"
                placeholder="Enter email"
                :class="{ 'invalid-email-bg': shouldShowError }"
                @blur="appendDomain"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'EduEmailInput',
    props: {
        modelValue: { type: String, default: '' },
        modelModifiers: { type: Object, default: () => ({}) },
    },
    emits: ['update:modelValue'],
    computed: {
        email: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            },
        },
        shouldShowError() {
            return this.modelModifiers.check && this.modelValue && !this.isValidEmail
        },
        isValidEmail() {
            return /^[^\s@]+@inv\.mn\.edu$/.test(this.modelValue)
        },
    },
    methods: {
        appendDomain() {
            if (this.modelValue && !this.modelValue.includes('@')) {
                this.email = `${this.modelValue}@inv.mn.edu`
            }
        },
    },
}
</script>

<style scoped>
.input-wrapper {
    margin: 16px 0;
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

input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.invalid-email-bg {
    background-color: red;
    border-color: var(--error-color);
}

label {
    display: block;
    font-weight: 500;
    color: var(--text-color);
}
</style>
