import { SYSTEMS, CATEGORIES, GRADE_CONVERSION } from '../constants/grades';

export const convertGrade = (grade, fromSystem, toSystem) => {
    if (grade > SYSTEMS[fromSystem === SYSTEMS.FIVE.id ? 'FIVE' : 'TWELVE'].max) return grade;
    
    if (fromSystem === toSystem) return grade;

    const normalizedGrade = Math.round(grade);

    // Convert from 5 to 12
    if (fromSystem === SYSTEMS.FIVE.id && toSystem === SYSTEMS.TWELVE.id) {
        return GRADE_CONVERSION['5to12'][normalizedGrade] || 1;
    }

    // Convert from 12 to 5
    if (fromSystem === SYSTEMS.TWELVE.id && toSystem === SYSTEMS.FIVE.id) {
        return GRADE_CONVERSION['12to5'][normalizedGrade] || 1;
    }

    return grade;
};

export const getCategory = (grade) => {
    if (grade > SYSTEMS.TWELVE.max) return CATEGORIES.SPECIAL.id;

    const roundedGrade = Math.round(grade);
    const grades = SYSTEMS.TWELVE.grades;

    if (grades.EXCELLENT.includes(roundedGrade)) return CATEGORIES.EXCELLENT.id;
    if (grades.GOOD.includes(roundedGrade)) return CATEGORIES.GOOD.id;
    if (grades.AVERAGE.includes(roundedGrade)) return CATEGORIES.AVERAGE.id;
    return CATEGORIES.POOR.id;
};
