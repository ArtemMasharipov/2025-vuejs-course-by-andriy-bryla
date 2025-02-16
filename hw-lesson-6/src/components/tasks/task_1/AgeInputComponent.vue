<template>
    <div class="input-container">
        <input
            :value="modelValue"
            type="number"
            class="base-input age-input"
            :class="[ageClass, { 'error-border': errorMessage }]"
            placeholder="Enter age"
            :min="AGE_LIMITS.MIN"
            :max="AGE_LIMITS.MAX"
            @input="handleInput"
        />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
const AGE_LIMITS = {
    MIN: 0,
    MAX: 150,
    YOUNG: 10,
    TEEN: 21,
}

const AGE_CLASSES = {
    YOUNG: 'age-input--young',
    TEEN: 'age-input--teen',
    ADULT: 'age-input--adult',
}

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
        return {
            AGE_LIMITS,
            errorMessage: '',
        }
    },
    computed: {
        ageClass() {
            if (!this.modelModifiers.setColor || !this.modelValue) return ''

            if (this.modelValue < AGE_LIMITS.YOUNG) return AGE_CLASSES.YOUNG
            if (this.modelValue <= AGE_LIMITS.TEEN) return AGE_CLASSES.TEEN
            return AGE_CLASSES.ADULT
        },
    },
    methods: {
        handleInput(event) {
            const value = event.target.value

            if (this.modelModifiers.check) {
                if (value > AGE_LIMITS.MAX) {
                    this.errorMessage = `Maximum age is ${AGE_LIMITS.MAX}`
                    event.target.value = this.modelValue ?? ''
                    return
                }
                if (value < AGE_LIMITS.MIN) {
                    this.errorMessage = 'Age cannot be negative'
                    event.target.value = this.modelValue ?? ''
                    return
                }
            }

            this.errorMessage = ''
            this.$emit('update:modelValue', value || null)
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

.error-border {
    border-color: #dc2626;
}

.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

.age-input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
