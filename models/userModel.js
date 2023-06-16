import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
User.associate = (models) => {
  User.hasMany(models.Donasi, { foreignKey: "user_id" });
};
User.associate = (models) => {
  User.hasMany(models.Komentar, { foreignKey: "user_id" });
};
User.associate = (models) => {
  User.hasMany(models.Kontribusi, { foreignKey: "user_id" });
};

export default User;

// (async () => {
//   await db.sync();
// })();
