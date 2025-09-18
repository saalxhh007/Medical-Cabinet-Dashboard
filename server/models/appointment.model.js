import { DataTypes } from 'sequelize';
import sequelize from '../db.js'
import Patient from './patient.model.js';
import Doctor from './doctor.model.js';

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('in-person', 'video call', 'phone call'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  duration: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  diagnosis: {
    type: DataTypes.JSON,
    allowNull: true
  },
  symptoms: {
    type: DataTypes.JSON,
    allowNull: true
  },
  notes: {
    type: DataTypes.JSON,
    allowNull: true
  },
  chiefComplaint: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vitalSigns: {
    type: DataTypes.JSON,
    allowNull: true
  },
  medications: {
    type: DataTypes.JSON,
    allowNull: true
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  followUpDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'appointments',
  timestamps: false
})

Appointment.belongsTo(Patient, { foreignKey: 'patient_id' })
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' })

export default Appointment