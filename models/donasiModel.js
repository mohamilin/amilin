import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Donasi = db.define(
  "donasi",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    nomor_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_rekening: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formated_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);
Donasi.associate = function (models) {
  Donasi.belongsToMany(models.User, { foreignKey: "user_id" });
  console.log(models);
};

export default Donasi;

// (async () => {
//   await db.sync();
// })();
