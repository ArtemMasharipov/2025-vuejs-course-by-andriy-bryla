export const transportTypes = ['Легкові', 'Вантажні']

export const bodyTypes = ['Седан', 'Позашляховик/Кросовер', 'Мікроавтобус', 'Хетчбек', 'Універсал']

export const brands = {
    Легкові: ['Audi', 'BMW', 'Mercedes', 'Toyota'],
    Вантажні: ['MAN', 'DAF', 'Scania'],
}

export const models = {
    Audi: ['A6', 'A4', 'Q7', 'Q5'],
    BMW: ['3 Series', '5 Series', 'X5', 'X6'],
    Mercedes: ['E-Class', 'C-Class', 'GLE', 'S-Class'],
    Toyota: ['RAV4', 'Camry', 'Land Cruiser', 'Corolla'],
    MAN: ['TGX', 'TGS', 'TGL'],
    DAF: ['XF', 'CF', 'LF'],
    Scania: ['R500', 'R450', 'P320'],
}

export const cars = [
    // Легкові
    {
        id: 1,
        brand: 'Audi',
        model: 'A6',
        year: 2018,
        price: 28500,
        transportType: 'Легкові',
        bodyType: 'Седан',
        engine: '2.0 TDI',
        transmission: 'Автомат',
        mileage: 75000,
        location: 'Київ',
        features: ['automatic', '4wd'],
        badges: ['verified', 'top'],
        itemImage: '🚗',
    },
    {
        id: 2,
        brand: 'BMW',
        model: 'X5',
        year: 2019,
        price: 45000,
        transportType: 'Легкові',
        bodyType: 'Позашляховик/Кросовер',
        engine: '3.0i',
        transmission: 'Автомат',
        mileage: 50000,
        location: 'Львів',
        features: ['automatic', '4wd', 'leather'],
        badges: ['top'],
        itemImage: '🚙',
    },
    {
        id: 3,
        brand: 'Mercedes',
        model: 'E-Class',
        year: 2020,
        price: 52000,
        transportType: 'Легкові',
        bodyType: 'Седан',
        engine: '2.0T',
        transmission: 'Автомат',
        mileage: 35000,
        location: 'Одеса',
        features: ['automatic', 'leather', 'premium'],
        badges: ['verified'],
        itemImage: '🚗',
    },
    {
        id: 4,
        brand: 'Toyota',
        model: 'RAV4',
        year: 2021,
        price: 33000,
        transportType: 'Легкові',
        bodyType: 'Позашляховик/Кросовер',
        engine: '2.5 Hybrid',
        transmission: 'Автомат',
        mileage: 25000,
        location: 'Харків',
        features: ['hybrid', '4wd'],
        badges: ['eco'],
        itemImage: '🚙',
    },
    {
        id: 5,
        brand: 'Audi',
        model: 'Q7',
        year: 2020,
        price: 55000,
        transportType: 'Легкові',
        bodyType: 'Позашляховик/Кросовер',
        engine: '3.0 TDI',
        transmission: 'Автомат',
        mileage: 40000,
        location: 'Київ',
        features: ['automatic', '4wd', 'premium'],
        badges: ['verified'],
        itemImage: '🚙',
    },
    // Вантажні
    {
        id: 6,
        brand: 'MAN',
        model: 'TGX',
        year: 2019,
        price: 85000,
        transportType: 'Вантажні',
        bodyType: 'Мікроавтобус',
        engine: '12.4D',
        transmission: 'Механіка',
        mileage: 150000,
        location: 'Київ',
        features: ['heavy-duty', 'diesel'],
        badges: ['commercial'],
        itemImage: '🚛',
    },
    {
        id: 7,
        brand: 'DAF',
        model: 'XF',
        year: 2020,
        price: 95000,
        transportType: 'Вантажні',
        bodyType: 'Мікроавтобус',
        engine: '13.0D',
        transmission: 'Автомат',
        mileage: 120000,
        location: 'Дніпро',
        features: ['heavy-duty', 'sleeper-cab'],
        badges: ['commercial', 'verified'],
        itemImage: '🚚',
    },
    {
        id: 8,
        brand: 'MAN',
        model: 'TGL',
        year: 2021,
        price: 75000,
        transportType: 'Вантажні',
        bodyType: 'Мікроавтобус',
        engine: '6.9D',
        transmission: 'Механіка',
        mileage: 80000,
        location: 'Львів',
        features: ['medium-duty', 'city-delivery'],
        badges: ['commercial'],
        itemImage: '🚚',
    },
    {
        id: 9,
        brand: 'Scania',
        model: 'R500',
        year: 2019,
        price: 98000,
        transportType: 'Вантажні',
        bodyType: 'Мікроавтобус',
        engine: '13.0D',
        transmission: 'Автомат',
        mileage: 200000,
        location: 'Одеса',
        features: ['heavy-duty', 'long-haul'],
        badges: ['commercial'],
        itemImage: '🚛',
    },
    // Additional Легкові
    {
        id: 18,
        brand: 'Mercedes',
        model: 'GLE',
        year: 2022,
        price: 75000,
        transportType: 'Легкові',
        bodyType: 'Позашляховик/Кросовер',
        engine: '3.0T',
        transmission: 'Автомат',
        mileage: 15000,
        location: 'Київ',
        features: ['premium', '4wd', 'leather'],
        badges: ['top', 'verified'],
        itemImage: '🚙',
    },
    {
        id: 19,
        brand: 'BMW',
        model: '5 Series',
        year: 2021,
        price: 48000,
        transportType: 'Легкові',
        bodyType: 'Седан',
        engine: '2.0T',
        transmission: 'Автомат',
        mileage: 30000,
        location: 'Львів',
        features: ['premium', 'leather'],
        badges: ['verified'],
        itemImage: '🚗',
    },
    {
        id: 20,
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 25000,
        transportType: 'Легкові',
        bodyType: 'Седан',
        engine: '2.5',
        transmission: 'Автомат',
        mileage: 45000,
        location: 'Харків',
        features: ['comfort', 'reliable'],
        badges: ['verified'],
        itemImage: '🚗',
    },
]

export default {
    transportTypes,
    bodyTypes,
    brands,
    models,
    cars,
}
