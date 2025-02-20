const catalogData = {
    productGroups: [
        { id: 1, name: 'Electronics', itemImage: '💻', categoryKey: 'electronics' },
        { id: 2, name: 'Clothing', itemImage: '👕', categoryKey: 'clothing' },
        { id: 3, name: 'Books', itemImage: '📚', categoryKey: 'books' },
        { id: 4, name: 'Sports', itemImage: '⚽', categoryKey: 'sports' },
    ],
    products: {
        electronics: [
            { id: 'e1', name: 'Laptop', groupId: 1, price: 1299, itemImage: '💻' },
            { id: 'e2', name: 'Smartphone', groupId: 1, price: 899, itemImage: '📱' },
            { id: 'e3', name: 'Wireless Headphones', groupId: 1, price: 249, itemImage: '🎧' },
            { id: 'e4', name: 'Digital Camera', groupId: 1, price: 699, itemImage: '📸' },
            { id: 'e5', name: 'Smart Watch', groupId: 1, price: 399, itemImage: '⌚' },
            { id: 'e6', name: 'Tablet', groupId: 1, price: 599, itemImage: '📱' },
            { id: 'e7', name: 'Smart TV', groupId: 1, price: 999, itemImage: '📺' },
            { id: 'e8', name: 'Gaming Console', groupId: 1, price: 499, itemImage: '🎮' },
        ],
        clothing: [
            { id: 'c1', name: 'Premium T-Shirt', groupId: 2, price: 39, itemImage: '👕' },
            { id: 'c2', name: 'Designer Jeans', groupId: 2, price: 89, itemImage: '👖' },
            { id: 'c3', name: 'Summer Dress', groupId: 2, price: 79, itemImage: '👗' },
            { id: 'c4', name: 'Winter Jacket', groupId: 2, price: 129, itemImage: '🧥' },
            { id: 'c5', name: 'Running Shoes', groupId: 2, price: 99, itemImage: '👟' },
            { id: 'c6', name: 'Baseball Cap', groupId: 2, price: 29, itemImage: '🧢' },
            { id: 'c7', name: 'Wool Socks', groupId: 2, price: 15, itemImage: '🧦' },
            { id: 'c8', name: 'Winter Scarf', groupId: 2, price: 35, itemImage: '🧣' },
        ],
        books: [
            { id: 'b1', name: 'Bestseller Novel', groupId: 3, price: 24, itemImage: '📖' },
            { id: 'b2', name: 'Science Textbook', groupId: 3, price: 79, itemImage: '📚' },
            { id: 'b3', name: 'Graphic Novel', groupId: 3, price: 19, itemImage: '📔' },
            { id: 'b4', name: 'Recipe Collection', groupId: 3, price: 34, itemImage: '📗' },
            { id: 'b5', name: 'Art Album', groupId: 3, price: 49, itemImage: '🎨' },
            { id: 'b6', name: 'Dictionary', groupId: 3, price: 29, itemImage: '📓' },
            { id: 'b7', name: 'Poetry Collection', groupId: 3, price: 22, itemImage: '📝' },
            { id: 'b8', name: 'History Book', groupId: 3, price: 39, itemImage: '📘' },
        ],
        sports: [
            { id: 's1', name: 'Pro Football', groupId: 4, price: 49, itemImage: '⚽' },
            { id: 's2', name: 'Basketball', groupId: 4, price: 39, itemImage: '🏀' },
            { id: 's3', name: 'Tennis Racket', groupId: 4, price: 159, itemImage: '🎾' },
            { id: 's4', name: 'Baseball Set', groupId: 4, price: 45, itemImage: '⚾' },
            { id: 's5', name: 'Volleyball', groupId: 4, price: 35, itemImage: '🏐' },
            { id: 's6', name: 'Golf Club Set', groupId: 4, price: 299, itemImage: '⛳' },
            { id: 's7', name: 'Skateboard', groupId: 4, price: 89, itemImage: '🛹' },
            { id: 's8', name: 'Boxing Gloves', groupId: 4, price: 69, itemImage: '🥊' },
        ],
    },
}

export default catalogData
