<template>
    <div class="car-card">
        <div class="car-image">
            <div class="emoji-image">{{ car.itemImage }}</div>
            <div class="badges">
                <span class="badge transport-type">{{ car.transportType }}</span>
                <span class="badge body-type">{{ car.bodyType }}</span>
            </div>
        </div>
        <div class="car-info">
            <h3>{{ carTitle }}</h3>
            <p class="price">${{ car.price.toLocaleString() }}</p>
            <div class="specs">
                <p>{{ car.engine }} • {{ car.transmission }}</p>
                <p>{{ car.mileage.toLocaleString() }} км</p>
                <p>{{ car.location }}</p>
            </div>
            <div class="features">
                <span v-for="feature in car.features" :key="feature" class="feature">
                    {{ feature }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarCard',
    props: {
        car: {
            type: Object,
            required: true
        }
    },
    computed: {
        carTitle() {
            return `${this.car.brand} ${this.car.model} ${this.car.year}`
        }
    }
}
</script>

<style scoped>
.car-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    transition: transform 0.2s;
}

.car-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.car-image {
    position: relative;
    height: 200px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.emoji-image {
    font-size: 100px;
    line-height: 1;
}

.badges {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
}

.badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    color: white;
}

.transport-type {
    background-color: #42b883;
    /* Vue green for transport type */
}

.body-type {
    background-color: #486491;
    /* Muted blue for body type */
}

.car-info {
    padding: 16px;
}

.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #42b883;
    margin: 8px 0;
}

.specs {
    color: #666;
    font-size: 0.9rem;
}

.features {
    display: flex;
    gap: 8px;
    margin: 12px 0;
}

.feature {
    padding: 4px 8px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 0.8rem;
}
</style>
