import { SYSTEMS } from '../constants/grades';
import studentsData from '../data/students.json';

export const fetchStudents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                gradeSystem: studentsData.gradeSystem || SYSTEMS.TWELVE.id,
                students: studentsData.students || []
            });
        }, 1500);
    });
};
