import carsDB from '@/data/carsDB'

const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 800))

export const carService = {
    async fetchInitialData() {
        await simulateDelay()
        return {
            cars: carsDB.cars.filter((car) => carsDB.transportTypes.includes(car.transportType)),
            filters: {
                transportTypes: carsDB.transportTypes.filter((type) => ['Легкові', 'Вантажні'].includes(type)),
                bodyTypes: carsDB.bodyTypes,
                brands: carsDB.brands,
                models: carsDB.models,
            },
        }
    },
}
