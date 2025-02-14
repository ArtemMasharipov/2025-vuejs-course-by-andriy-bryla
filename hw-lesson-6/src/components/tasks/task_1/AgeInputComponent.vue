<template>
    <div class="input-container">
        <input
            v-model="inputValue"
            type="number"
            class="base-input age-input"
            :class="ageClass"
            placeholder="Enter age"
            min="0"
            max="150"
        />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    name: 'AgeInputComponent',
    props: {
        modelValue: {
            type: Number,
            default: null,
        },
        modelModifiers: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['update:modelValue'],
    data() {
        return { errorMessage: '' }
    },
    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                value = value || null

                if (this.modelModifiers.check && value > 150) {
                    this.errorMessage = 'Age cannot be greater than 150'
                    return
                }

                this.errorMessage = ''
                this.$emit('update:modelValue', value)
            },
        },
        ageClass() {
            if (!this.modelModifiers.setColor || this.modelValue == null) return ''

            return this.modelValue < 10
                ? 'age-input--young'
                : this.modelValue <= 21
                ? 'age-input--teen'
                : 'age-input--adult'
        },
    },
}
</script>

<style scoped>
.input-container {
    max-width: 400px;
}

.age-input {
    padding: 12px;
    font-size: 16px;
    border: 2px solid #e5e7eb;
    border-radius: var(--border-radius);
    width: 100%;
    transition: var(--transition);
}

.error {
    color: var(--error-color);
    margin-top: 8px;
    font-size: 14px;
}

.age-input--young {
    background-color: #22c55e;
    color: white;
}
.age-input--teen {
    background-color: #eab308;
    color: white;
}
.age-input--adult {
    background-color: #f97316;
    color: white;
}

.age-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
