<template>
    <div class="catalog-item">
        <div class="catalog-item-image">{{ product.itemImage }}</div>
        <div class="catalog-item-content">
            <h3 class="item-name">{{ product.name }}</h3>
            <p class="item-price">${{ product.price }}</p>
        </div>
        <button class="buy-button">
            Add to Cart
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.catalog-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 1.5rem;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.catalog-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.catalog-item-image {
    font-size: 4rem;
    margin-bottom: 1rem;
    user-select: none;
    text-align: center;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.catalog-item-content {
    flex-grow: 1;
    padding: 0.5rem 0;
}

.item-name {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    /* Increased font size */
    color: #333;
    /* Darker color for better readability */
    font-weight: 600;
}

.item-price {
    margin: 0;
    font-size: 1.4rem;
    /* Increased font size */
    color: #28a745;
    /* A slightly darker shade of green */
    font-weight: bold;
}

.buy-button {
    margin-top: 1rem;
    padding: 0.8rem;
    border: none;
    background-color: #42b883;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.buy-button:hover {
    background-color: #3aa876;
}
</style>
