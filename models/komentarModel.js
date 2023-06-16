import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const Komentar = db.define(
  "Komentar",
  {
    komentar_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "artikel",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    komentar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
Komentar.associate = function (models) {
  Komentar.belongsTo(models.User, { foreignKey: "user_id" });
  console.log(models);
  Komentar.belongsTo(models.artikel, { foreignKey: "article_id" });
  console.log(models);
};

export default Komentar;

(async () => {
  await db.sync();
})();
