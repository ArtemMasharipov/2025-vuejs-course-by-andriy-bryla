<template>
    <div class="product-card">
        <div class="product-card__image-container">
            <span :class="['product-card__emoji', `product-card__emoji--${brandName}`]">
                {{ product.imgSrc }}
            </span>
            <span :class="['shop-badge', `shop-badge--${product.shop.toLowerCase()}`]">
                {{ product.shop }}
            </span>
        </div>
        <div class="product-card__details">
            <h4 class="product-card__title">{{ product.title }}</h4>
            <span class="product-card__price">{{ formattedPrice }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        brandName() {
            return this.product.title.split(' ')[0].toLowerCase()
        },
        formattedPrice() {
            return `${this.product.currentPrice}₴`
        },
    },
}
</script>

<style scoped>
.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;
}

.product-card__image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
    position: relative;
}

.product-card__emoji {
    font-size: 72px;
    line-height: 1;
    transition: all 0.3s ease;
}

.product-card__emoji--asus {
    filter: hue-rotate(210deg) saturate(1.5);
}
.product-card__emoji--dell {
    filter: hue-rotate(180deg) saturate(1.2);
}
.product-card__emoji--hp {
    filter: hue-rotate(240deg) saturate(1.3);
}
.product-card__emoji--lenovo {
    filter: hue-rotate(320deg) saturate(1.4);
}
.product-card__emoji--msi {
    filter: hue-rotate(0deg) saturate(1.8);
}
.product-card__emoji--acer {
    filter: hue-rotate(120deg) saturate(1.6);
}

.product-card:hover .product-card__emoji {
    transform: scale(1.1);
}

.product-card__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
}

.product-card__title {
    color: #333;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
}

.product-card__price {
    color: #dc3545;
    font-weight: bold;
}

.shop-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.shop-badge--rozetka {
    background: linear-gradient(135deg, #4caf50, #2e7d32);
    animation: gradientRozetka 3s ease infinite;
    background-size: 200% 200%;
}

.shop-badge--citrus {
    background: linear-gradient(135deg, #ff9800, #f57c00);
    animation: gradientCitrus 3s ease infinite;
    background-size: 200% 200%;
}

@keyframes gradientRozetka {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes gradientCitrus {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
