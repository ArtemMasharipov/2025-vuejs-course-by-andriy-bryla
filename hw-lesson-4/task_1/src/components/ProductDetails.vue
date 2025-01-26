<template>
    <div ref="detailsContainer" class="product-details section card">
        <header class="details-header">
            <button class="btn btn-secondary back-btn" @click="$emit('back')">
                <span class="icon">←</span> Назад
            </button>
            <div class="breadcrumbs">
                <span>Каталог</span>
                <span class="separator">/</span>
                <span>{{ product.name }}</span>
            </div>
        </header>

        <div class="details-content">
            <div class="product-media">
                <div class="emoji-container" :class="{ 'out-of-stock': !product.available }">
                    <span class="product-emoji">{{ product.image }}</span>
                    <span v-if="!product.available" class="out-of-stock-label">
                        Немає в наявності
                    </span>
                </div>
                <div class="product-meta">
                    <div class="product-status" :class="{ 'in-stock': product.available }">
                        {{ product.available ? 'Є в наявності' : 'Немає в наявності' }}
                    </div>
                    <div class="product-id">Код товару: {{ product.id }}</div>
                </div>
            </div>

            <div class="product-info">
                <h1 class="product-title">{{ product.name }}</h1>
                
                <div class="price-block">
                    <div class="price-info">
                        <h2 ref="priceElement" class="price">{{ formattedPrice }}</h2>
                        <span v-if="product.available" class="price-note">
                            Є можливість оплати частинами
                        </span>
                    </div>
                    <button 
                        v-if="product.available" 
                        class="btn btn-primary buy-btn"
                        @click="$emit('buy', product)"
                    >
                        <span class="icon">🛒</span>
                        Купити
                    </button>
                </div>

                <div class="description-block">
                    <h3>Опис</h3>
                    <p class="description">{{ product.description }}</p>
                </div>

                <div class="actions">
                    <button 
                        class="btn btn-secondary favorite-btn"
                        disabled
                    >
                        <span class="icon">❤️</span>
                        В обране
                    </button>
                    <button 
                        class="btn btn-secondary share-btn"
                        disabled
                    >
                        <span class="icon">🔗</span>
                        Поділитися
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductDetails',
    props: {
        product: {
            type: Object,
            required: true,
            validator: product => {
                return ['id', 'name', 'price', 'available', 'image', 'description']
                    .every(prop => prop in product)
            }
        }
    },
    emits: ['back', 'buy'],
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat('uk-UA', {
                style: 'currency',
                currency: 'UAH',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(this.product.price)
        }
    },
    watch: {
        'product.price': {
            handler(newPrice, oldPrice) {
                if (oldPrice && this.$refs.priceElement) {
                    const element = this.$refs.priceElement
                    element.classList.add('price-changed')
                    setTimeout(() => element.classList.remove('price-changed'), 1000)
                }
            },
            immediate: true
        }
    },

    mounted() {
        this.$refs.detailsContainer.classList.add('details-mounted')
    }
}
</script>

<style scoped>
.product-details {
    min-height: 90vh;
}

.details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: calc(var(--spacing-unit) * 4);
    padding-bottom: var(--spacing-unit);
    border-bottom: 1px solid #eee;
}

.breadcrumbs {
    color: #666;
    font-size: 0.9em;
}

.separator {
    margin: 0 var(--spacing-unit);
    color: #999;
}

.details-content {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 2fr;
    gap: calc(var(--spacing-unit) * 5);
}

.product-media {
    position: sticky;
    top: calc(var(--spacing-unit) * 2);
}

.emoji-container {
    position: relative;
    font-size: 8em;
    padding: calc(var(--spacing-unit) * 5);
    background: #f8f9fa;
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-unit);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.out-of-stock {
    opacity: 0.5;
}

.out-of-stock-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: var(--spacing-unit);
    border-radius: calc(var(--border-radius) / 2);
    font-size: 0.2em;
    white-space: nowrap;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #666;
}

.product-status {
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    background: #ffebee;
    color: #e53935;
    font-weight: 500;
}

.product-status.in-stock {
    background: #e8f5e9;
    color: #43a047;
}

.price-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.price-info {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing-unit) / 2);
}

.price {
    font-size: 2em;
    color: #2c3e50;
    margin: 0;
}

.price-note {
    font-size: 0.9em;
    color: var(--success-color);
}

.btn-primary {
    background: #42b983;
    color: white;
    font-size: 1.2em;
    padding: 12px 30px;
}

.description-block {
    margin: calc(var(--spacing-unit) * 4) 0;
    padding: calc(var(--spacing-unit) * 3);
    background: #f8f9fa;
    border-radius: var(--border-radius);
}

.description {
    line-height: 1.6;
    color: #444;
}

.actions {
    display: flex;
    gap: calc(var(--spacing-unit) * 2);
    margin-top: 30px;
}

.icon {
    font-size: 1.2em;
}

@media (max-width: 768px) {
    .details-content {
        grid-template-columns: 1fr;
    }

    .product-media {
        position: static;
    }

    .price-block {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }

    .actions {
        flex-direction: column;
    }

    .breadcrumbs {
        display: none;
    }
}

.price-changed {
    animation: priceUpdate 1s ease;
}

.details-mounted {
    animation: slideIn 0.3s ease-out;
}

@keyframes priceUpdate {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); color: var(--primary-color); }
    100% { transform: scale(1); }
}

@keyframes slideIn {
    from { 
        opacity: 0;
        transform: translateY(20px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

.favorite-btn,
.share-btn {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>
