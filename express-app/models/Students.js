import { DataTypes, Model } from 'sequelize';

import db from '../clients/db.sequelize.js';

class Students extends Model {
    static async createDefaults() {
    }
}

Students.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: db,
    modelName: 'students',
    tableName: 'students',
    timestamps: true,
});

export default Students;