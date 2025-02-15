export const notebookCardsSources = [
    {
        id: Symbol(),
        title: 'ASUS TUF Gaming A15',
        imgSrc: '💻',
        imgAlt: 'Gaming Laptop',
        currentPrice: 49999,
        shop: 'Rozetka',
    },
    {
        id: Symbol(),
        title: 'ASUS ROG Strix',
        imgSrc: '🖥️',
        imgAlt: 'Premium Gaming Laptop',
        currentPrice: 55999,
        shop: 'Rozetka',
    },
    {
        id: Symbol(),
        title: 'Dell XPS 15',
        imgSrc: '💻',
        imgAlt: 'Premium Workstation',
        currentPrice: 65999,
        shop: 'Citrus',
    },
    {
        id: Symbol(),
        title: 'HP Pavilion Gaming',
        imgSrc: '🖥️',
        imgAlt: 'Gaming Desktop',
        currentPrice: 33999,
        shop: 'Rozetka',
    },
    {
        id: Symbol(),
        title: 'Lenovo Legion Pro',
        imgSrc: '💻',
        imgAlt: 'Pro Gaming Laptop',
        currentPrice: 58999,
        shop: 'Citrus',
    },
    {
        id: Symbol(),
        title: 'MSI Katana GF66',
        imgSrc: '🖥️',
        imgAlt: 'Gaming Desktop',
        currentPrice: 41999,
        shop: 'Rozetka',
    },
    {
        id: Symbol(),
        title: 'HP Omen 16',
        imgSrc: '💻',
        imgAlt: 'Premium Gaming Laptop',
        currentPrice: 61999,
        shop: 'Citrus',
    },
    {
        id: Symbol(),
        title: 'Acer Predator',
        imgSrc: '🖥️',
        imgAlt: 'High-End Gaming Desktop',
        currentPrice: 71999,
        shop: 'Rozetka',
    },
    {
        id: Symbol(),
        title: 'Dell Alienware',
        imgSrc: '💻',
        imgAlt: 'Premium Gaming Laptop',
        currentPrice: 89999,
        shop: 'Citrus',
    },
    {
        id: Symbol(),
        title: 'Lenovo IdeaPad',
        imgSrc: '💻',
        imgAlt: 'Budget Laptop',
        currentPrice: 22999,
        shop: 'Rozetka',
    },
    {
        id: Symbol(),
        title: 'HP Envy x360',
        imgSrc: '💻',
        imgAlt: 'Convertible Laptop',
        currentPrice: 45999,
        shop: 'Citrus',
    },
    {
        id: Symbol(),
        title: 'ASUS ZenBook',
        imgSrc: '💻',
        imgAlt: 'Ultra-Thin Laptop',
        currentPrice: 38999,
        shop: 'Rozetka',
    },
]

export const getUniqueShops = (cards) => [...new Set(cards.map((card) => card.shop))]
export const getUniqueBrands = (cards) => [...new Set(cards.map((card) => card.title.split(' ')[0]))].sort()
