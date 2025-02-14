<template>
    <div class="filter-section">
        <h3 class="filter-section__title">{{ title }}</h3>
        <div class="filter-section__options-list">
            <label v-for="item in items" :key="item" class="filter-section__option-item">
                <input v-model="selected" type="checkbox" :value="item" class="filter-section__checkbox" />
                <span class="filter-section__label-text">{{ item }}</span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterSection',
    props: {
        title: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['update:modelValue'],
    computed: {
        selected: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            },
        },
    },
}
</script>

<style scoped>
.filter-section {
    margin-bottom: 20px;
}

.filter-section__title {
    margin-bottom: 10px;
    font-weight: 600;
    color: #333;
}

.filter-section__options-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-section__option-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.filter-section__label-text {
    font-size: 14px;
}

.filter-section__option-item:hover .filter-section__label-text {
    text-decoration: underline;
}
</style>
