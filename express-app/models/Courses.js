import { DataTypes, Model } from 'sequelize';

import db from '../clients/db.sequelize.js';

class Courses extends Model {
    static async createDefaults() {
    }
}

Courses.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credits: {
        type: DataTypes.BIGINT,
    },
}, {
    sequelize: db,
    modelName: 'courses',
    tableName: 'courses',
    timestamps: true,
});

export default Courses;