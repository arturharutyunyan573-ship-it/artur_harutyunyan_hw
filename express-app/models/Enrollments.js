import { DataTypes, Model } from 'sequelize';

import db from '../clients/db.sequelize.js';

import Students from './Students.js';
import Courses from './Courses.js';

class Enrollments extends Model {
    static async createDefaults() {
    }
}

Enrollments.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    grade: {
        type: DataTypes.STRING,
    },
    semester: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: db,
    modelName: 'enrollments',
    tableName: 'enrollments',
    timestamps: true,
});

Students.belongsToMany(Courses, {
    through: Enrollments,
    as: 'courses',
    foreignKey: 'studentId',
    otherKey: 'courseId',
});

Courses.belongsToMany(Students, {
    through: Enrollments,
    as: 'students',
    foreignKey: 'courseId',
    otherKey: 'studentId',
});

export default Enrollments;