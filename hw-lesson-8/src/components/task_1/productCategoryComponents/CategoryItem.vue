<template>
    <div class="category-wrapper">
        <div :class="['category-button', { active: isActive }]" @click="onSelect">
            <div class="category-button-image">{{ category.itemImage }}</div>
        </div>
        <div class="category-name">{{ category.name }}</div>
    </div>
</template>

<script>
export default {
    name: 'CategoryItem',
    props: {
        category: {
            type: Object,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['select'],
    methods: {
        onSelect() {
            this.$emit('select', this.category.id);
        }
    }
}
</script>

<style scoped>
.category-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.category-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 2px solid #ccc;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;
    overflow: hidden;
}

.category-button-image {
    font-size: 4rem;
    line-height: 1;
    user-select: none;
}

.category-name {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 0.5rem;
    user-select: none;
    color: #555;
}

.category-button.active {
    border-color: red;
    transform: scale(1.1);
}
</style>
