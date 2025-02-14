<template>
    <div class="form-wrapper">
        <div class="input-group">
            <label class="form-label">
                <span class="label-text">{{ nameTitle }}</span>
                <input
                    v-model="nameValue"
                    type="text"
                    :class="{ 'invalid-name': shouldShowNameError }"
                    placeholder="Enter name"
                />
            </label>
        </div>

        <div class="input-group">
            <label class="form-label">
                <span class="label-text">{{ ageTitle }}</span>
                <input v-model="ageValue" type="number" :class="ageClass" min="0" placeholder="Enter age" />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserFormInput',
    props: {
        nameTitle: { type: String, default: '' },
        ageTitle: { type: String, default: '' },
        name: { type: String, default: '' },
        age: { type: Number, default: null },
        nameModifiers: { type: Object, default: () => ({}) },
        ageModifiers: { type: Object, default: () => ({}) },
    },
    emits: ['update:name', 'update:age'],
    computed: {
        nameValue: {
            get() {
                return this.name
            },
            set(value) {
                this.$emit('update:name', value)
            },
        },
        ageValue: {
            get() {
                return this.age
            },
            set(value) {
                this.$emit('update:age', value)
            },
        },
        shouldShowNameError() {
            return this.nameModifiers.check && !this.name.trim()
        },
        ageClass() {
            if (!this.ageModifiers.check || this.age === null || this.age === '') return ''
            return this.age < 18 ? 'age-invalid' : 'age-valid'
        },
    },
}
</script>

<style scoped>
.form-wrapper {
    max-width: 500px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.input-group {
    margin: 15px 0;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 10px;
}

.label-text {
    min-width: 100px;
    text-align: right;
    font-weight: 500;
}

input {
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input::placeholder {
    color: #999;
}

.invalid-name,
.age-invalid {
    background-color: rgba(255, 0, 0, 0.1);
    border-color: #ff0000;
}

.age-valid {
    background-color: rgba(0, 255, 0, 0.1);
    border-color: #00ff00;
}
</style>
