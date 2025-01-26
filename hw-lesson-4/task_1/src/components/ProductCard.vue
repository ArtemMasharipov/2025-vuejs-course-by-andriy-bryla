<template>
    <article class="product-card-wrapper">
        <div class="product-card" :class="{ 'out-of-stock': !product.available }">
            <div class="card-content">
                <div class="emoji-container" :title="product.name">
                    <span class="product-emoji">{{ product.image }}</span>
                    <span v-if="!product.available" class="status-badge">
                        Немає в наявності
                    </span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="price">{{ formattedPrice }}</p>
                    <p class="availability" :class="{ 'in-stock': product.available }">
                        {{ product.available ? 'Є в наявності' : 'Немає в наявності' }}
                    </p>
                    <p class="description-preview">{{ truncatedDescription }}</p>
                </div>
                <div class="card-actions">
                    <button
v-if="product.available" 
                            class="btn btn-primary buy-button"
                            @click.stop="$emit('buy', product)">
                        <span class="icon">🛒</span> Купити
                    </button>
                    <button
class="btn btn-secondary details-button"
                            @click.stop="$emit('view-details', product)">
                        Детальніше <span class="icon">→</span>
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true,
            validator: product => product?.name && typeof product?.price === 'number'
        }
    },
    emits: ['view-details', 'buy'],
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat('uk-UA', {
                style: 'currency',
                currency: 'UAH',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(this.product.price)
        },
        truncatedDescription() {
            return this.product.description?.length > 60
                ? this.product.description.slice(0, 60) + '...'
                : this.product.description
        }
    }
}
</script>

<style scoped>
.product-card-wrapper {
    position: relative;
    padding: 8px;
    margin: -8px;
}

.product-card {
    position: relative;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: var(--border-radius);
    height: 100%;
    cursor: default;
}

.product-card:hover {
    border-color: var(--primary-color);
}

.card-content {
    position: relative;
    height: 100%;
    padding: calc(var(--spacing-unit) * 2);
    display: flex;
    flex-direction: column;
}

.emoji-container {
    position: relative;
    height: 200px;
    background: #f8f9fa;
    border-radius: var(--border-radius);
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.product-emoji {
    font-size: 8em;
    line-height: 1;
    user-select: none;
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-unit);
}

.card-actions {
    display: flex;
    gap: var(--spacing-unit);
    margin-top: auto;
    opacity: 0;
    transform: translateY(10px);
    transition: all var(--transition-speed);
}

.product-card:hover .card-actions {
    opacity: 1;
    transform: translateY(0);
}

.product-name {
    font-size: 1.2em;
    margin: 0;
    color: var(--secondary-color);
    line-height: 1.3;
}

.description-preview {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    font-size: 0.9em;
    color: #666;
    line-height: 1.4;
    margin: 0;
}

.status-badge {
    position: absolute;
    top: var(--spacing-unit);
    right: var(--spacing-unit);
    background: var(--danger-color);
    color: white;
    padding: calc(var(--spacing-unit) / 2) var(--spacing-unit);
    border-radius: calc(var(--border-radius) / 2);
    font-size: 0.8rem;
}

.out-of-stock {
    opacity: 0.7;
}

.out-of-stock .emoji-container {
    filter: grayscale(1);
}

.icon {
    margin-left: var(--spacing-unit);
}

.price {
    font-size: 1.4em;
    font-weight: bold;
    color: var(--secondary-color);
    margin: 0;
}

.details-button, .buy-button {
    cursor: pointer;
}
</style>
