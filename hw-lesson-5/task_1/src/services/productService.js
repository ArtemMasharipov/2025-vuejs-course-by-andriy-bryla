import productsData from '../data/products.json'

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productsData.products)
        }, 1500) 
    })
}