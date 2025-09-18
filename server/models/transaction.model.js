import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Patient from "./patient.model.js";

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('revenue', 'expense'),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('paid', 'pending', 'overdue'),
        allowNull: false,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'patients',
            key: 'id',
        },
        allowNull: true,
    },
}, {
    tableName: 'transactions',
    timestamps: false,
})

Transaction.belongsTo(Patient, { foreignKey: "patient_id" })


export default Transaction