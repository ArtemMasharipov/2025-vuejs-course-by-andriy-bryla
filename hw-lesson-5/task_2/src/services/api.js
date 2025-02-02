import laptopsData from '@/data/laptops.json'

export const fetchLaptopsFromDB = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(laptopsData.laptops)
            } catch (error) {
                reject(new Error('Database connection failed: Unable to fetch laptops data'))
            }
        }, 1500)
    })
}
