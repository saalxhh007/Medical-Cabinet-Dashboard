import { DataTypes } from 'sequelize';
import sequelize from '../db.js'

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  created_At: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'patients',
  timestamps: false
});

export default Patient