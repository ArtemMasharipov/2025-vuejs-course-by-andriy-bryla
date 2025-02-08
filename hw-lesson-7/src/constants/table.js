export const TABLE_HEADERS = {
    NAME: { id: 'name', label: 'ПІБ' },
    GRADE: { id: 'grade', label: 'Середній бал' },
    CATEGORY: { id: 'category', label: 'Категорія' }
};

export const HEADERS = Object.values(TABLE_HEADERS).map(h => h.label);
