import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Document = sequelize.define(
  "Document",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    uploadDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    patientFirstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    patientLastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "documents",
    timestamps: true,
  }
);

export default Document