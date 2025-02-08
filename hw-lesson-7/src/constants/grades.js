export const SYSTEMS = {
    TWELVE: {
        id: '12',
        name: '12-бальна система',
        max: 12,
        grades: {
            EXCELLENT: [10, 11, 12],
            GOOD: [7, 8, 9],
            AVERAGE: [4, 5, 6],
            POOR: [1, 2, 3]
        }
    },
    FIVE: {
        id: '5',
        name: '5-бальна система',
        max: 5,
        grades: {
            EXCELLENT: [5],
            GOOD: [4],
            AVERAGE: [3],
            POOR: [1, 2]
        }
    }
};

export const CATEGORIES = {
    ALL: { id: 'all', label: 'Всі категорії' },
    EXCELLENT: { id: 'excellent', label: 'Відмінник' },
    GOOD: { id: 'good', label: 'Хорошист' },
    AVERAGE: { id: 'average', label: 'Трійочник' },
    POOR: { id: 'poor', label: 'Двійочник' },
    SPECIAL: { id: 'special', label: 'Блатник' }
};

export const GRADE_CONVERSION = {
    '12to5': {
        12: 5, 11: 5, 10: 5,
        9: 4, 8: 4, 7: 4,
        6: 3, 5: 3, 4: 3,
        3: 2, 2: 2,
        1: 1
    },
    '5to12': {
        5: 11,
        4: 8,
        3: 5,
        2: 2,
        1: 1
    }
};
